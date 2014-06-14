#!/bin/bash

developer=$1
port_to_start_with=$2

if [ -z "$developer" -o -z "$port_to_start_with" ]
then
  echo "  Usage:"
  echo "    init_dev_env.sh developer_name port_to_start_with"
  echo ""
  echo "  WARNING: port_to_start_with % 100 = 0 should be satisfied!"
  echo ""
  echo "  To run init_dev_env.sh _5_ consecutive, available (not already open) ports are needed."
  echo "  Hit 'netstat -lnptu' to check open ports."
  exit
fi

rest=$((port_to_start_with % 100))

if [ "$rest" != "0" ]
then
  echo "ERROR: port_to_start_with % 100 = $rest != 0"
  echo "Please, provide port divisible by 100."
  exit
fi

echo "Creating developer's environment..."
base_dir=/home/$developer/ants/dev_env
pids_dir=$base_dir/pids
data_dir=$base_dir/data

if [ ! -z "$(find $pids_dir -type f)" ]
then
  echo "Some services seem to be already running. Please, shutdown them before continue."
  exit
fi

if [ -e "$base_dir" ]
then
  echo "Developer's environment seems to exist. If you continue you may loose data stored there."
  echo "Continue? [Y/N]"
  read decision

  if [ "$decision" != "Y" ]
  then
    echo "Aborting..."
    exit
  fi
fi

mkdir $base_dir > /dev/null 2>&1
mkdir $pids_dir > /dev/null 2>&1
mkdir $data_dir > /dev/null 2>&1

## MYSQL
echo "## Setting up MySQL.."

mysql_data_dir=$data_dir/mysql/data
mysql_sock_dir=$data_dir/mysql/sock

mkdir $data_dir/mysql > /dev/null 2>&1
rm -rf $mysql_data_dir
mkdir $mysql_data_dir > /dev/null 2>&1
mkdir $mysql_sock_dir > /dev/null 2>&1

mysql_port=$((port_to_start_with))
mysql_pid=${pids_dir}/mysql.pid
mysql_sock=${mysql_data_dir}/sock/mysqld.sock

mysql_data_dir_escaped=$(echo $mysql_data_dir | sed -e 's/[\/&]/\\&/g')
mysql_pid_escaped=$(echo $mysql_pid | sed -e 's/[\/&]/\\&/g')
mysql_sock_escaped=$(echo $mysql_sock | sed -e 's/[\/&]/\\&/g')
sed -e "s/@DEVELOPER/$developer/g" -e "s/@PORT/$mysql_port/g" -e "s/@MYSQL-SOCK/$mysql_sock_escaped/g" -e "s/@MYSQL-PID/$mysql_pid_escaped/g" -e "s/@MYSQL-DATADIR/$mysql_data_dir_escaped/g" <mysql-skel.cnf > ${base_dir}/mysql_$developer.cnf

echo "Installing clean db..."
mysql_install_db --datadir=$mysql_data_dir > /dev/null
echo -n "Running mysqld..."
mysqld_safe --defaults-file=${base_dir}/mysql_$developer.cnf& > /dev/null

for i in 1 2 3 4 5
do
  sleep 1
  echo -n "."
done

echo ""
echo "Enter the new database root password: "
read PASS
mysqladmin --defaults-file=${base_dir}/mysql_$developer.cnf -u root password "$PASS"

echo '#!/bin/bash' > ${base_dir}/mysql_start.sh
echo "mysqld_safe --defaults-file=${base_dir}/mysql_$developer.cnf&" >> ${base_dir}/mysql_start.sh
chmod +x ${base_dir}/mysql_start.sh

echo '#!/bin/bash' > ${base_dir}/mysql_stop.sh
echo "mysqladmin --defaults-file=${base_dir}/mysql_$developer.cnf --user=root --password=$PASS shutdown" >> ${base_dir}/mysql_stop.sh
chmod +x ${base_dir}/mysql_stop.sh

echo '#!/bin/bash' > ${base_dir}/mysql_client.sh
echo "mysql --user=root --password=$PASS -h 127.0.0.1 -P $mysql_port" >> ${base_dir}/mysql_client.sh
chmod +x ${base_dir}/mysql_client.sh
echo "Done."

## MEMCACHED
echo "## Setting up memcached..."
memcached_local_port=$((port_to_start_with+1))
memcached_global_port=$((port_to_start_with+2))
memcached_local_pid=$pids_dir/memcached_local.pid
memcached_global_pid=$pids_dir/memcached_global.pid

echo '#!/bin/bash' > ${base_dir}/memcached_local_start.sh
echo "memcached -d -m 16 -p $memcached_local_port -u $developer -l 127.0.0.1" >> ${base_dir}/memcached_local_start.sh
echo "sleep 2" >> ${base_dir}/memcached_local_start.sh
echo "ps ax | grep 'memcached -d -m 16 -p $memcached_local_port' | grep -v grep | cut -c 1-5 > ${memcached_local_pid}" >> ${base_dir}/memcached_local_start.sh
chmod +x ${base_dir}/memcached_local_start.sh

echo '#!/bin/bash' > ${base_dir}/memcached_local_stop.sh
echo 'pid=$(cat '"${memcached_local_pid}"')' >> ${base_dir}/memcached_local_stop.sh
echo 'kill -9 $pid' >> ${base_dir}/memcached_local_stop.sh
echo "rm ${memcached_local_pid}" >> ${base_dir}/memcached_local_stop.sh
chmod +x ${base_dir}/memcached_local_stop.sh

echo '#!/bin/bash' > ${base_dir}/memcached_global_start.sh
echo "memcached -d -m 16 -p $memcached_global_port -u $developer -l 127.0.0.1" >> ${base_dir}/memcached_global_start.sh
echo "sleep 2" >> ${base_dir}/memcached_global_start.sh
echo "ps ax | grep 'memcached -d -m 16 -p $memcached_global_port' | grep -v grep | cut -c 1-5 > ${memcached_global_pid}" >> ${base_dir}/memcached_global_start.sh
chmod +x ${base_dir}/memcached_global_start.sh

echo '#!/bin/bash' > ${base_dir}/memcached_global_stop.sh
echo 'pid=$(cat '"${memcached_global_pid}"')' >> ${base_dir}/memcached_global_stop.sh
echo 'kill -9 $pid' >> ${base_dir}/memcached_global_stop.sh
echo "rm ${memcached_global_pid}" >> ${base_dir}/memcached_global_stop.sh
chmod +x ${base_dir}/memcached_global_stop.sh

${base_dir}/memcached_local_start.sh
${base_dir}/memcached_global_start.sh

echo "Done."

## REDIS
echo "## Setting up redises..."
redis_master_port=$((port_to_start_with+3))
redis_slave_port=$((port_to_start_with+4))
redis_db_dir=$data_dir/redis
redis_master_db_dir=$redis_db_dir/master
redis_slave_db_dir=$redis_db_dir/slave
redis_master_pid=$pids_dir/redis-master.pid
redis_slave_pid=$pids_dir/redis-slave.pid

rm -rf $redis_db_dir
mkdir $redis_db_dir
mkdir $redis_master_db_dir
mkdir $redis_slave_db_dir

redis_master_pid_escaped=$(echo $redis_master_pid | sed -e 's/[\/&]/\\&/g')
redis_master_db_dir_escaped=$(echo $redis_master_db_dir | sed -e 's/[\/&]/\\&/g')
sed -e "s/@PORT/$redis_master_port/g" -e "s/@DEVELOPER/$developer/g" -e "s/@SLAVE//g" -e "s/@REDIS_PID/$redis_master_pid_escaped/g" -e "s/@REDIS_DATA/$redis_master_db_dir_escaped/g" <redis-skel.cnf > ${base_dir}/redis_master.cnf

redis_slave_pid_escaped=$(echo $redis_slave_pid | sed -e 's/[\/&]/\\&/g')
redis_slave_db_dir_escaped=$(echo $redis_slave_db_dir | sed -e 's/[\/&]/\\&/g')
sed -e "s/@PORT/$redis_slave_port/g" -e "s/@DEVELOPER/$developer/g" -e "s/@SLAVE/slaveof 127.0.0.1 $redis_master_port/g" -e "s/@REDIS_PID/$redis_slave_pid_escaped/g" -e "s/@REDIS_DATA/$redis_slave_db_dir_escaped/g" <redis-skel.cnf > ${base_dir}/redis_slave.cnf

echo '#!/bin/bash' > ${base_dir}/redises_start.sh
echo "redis-server ${base_dir}/redis_master.cnf" >> ${base_dir}/redises_start.sh
echo "sleep 3" >> ${base_dir}/redises_start.sh
echo "redis-server ${base_dir}/redis_slave.cnf" >> ${base_dir}/redises_start.sh
chmod +x ${base_dir}/redises_start.sh

echo '#!/bin/bash' > ${base_dir}/redises_stop.sh
echo "redis-cli -h 127.0.0.1 -p $redis_slave_port shutdown" >> ${base_dir}/redises_stop.sh
echo "sleep 3" >> ${base_dir}/redises_stop.sh
echo "redis-cli -h 127.0.0.1 -p $redis_master_port shutdown" >> ${base_dir}/redises_stop.sh
chmod +x ${base_dir}/redises_stop.sh

echo '#!/bin/bash' > ${base_dir}/redis_master_cli.sh
echo "redis-cli -h 127.0.0.1 -p $redis_master_port" >> ${base_dir}/redis_master_cli.sh
chmod +x ${base_dir}/redis_master_cli.sh

echo '#!/bin/bash' > ${base_dir}/redis_slave_cli.sh
echo "redis-cli -h 127.0.0.1 -p $redis_slave_port" >> ${base_dir}/redis_slave_cli.sh
chmod +x ${base_dir}/redis_slave_cli.sh

${base_dir}/redises_start.sh

echo "Done."

echo ""
echo "Services are prepared and (hopefully) run. You can control them by scripts from ${base_dir}!"

## OTHER SCRIPTS
echo '#!/bin/bash' > ${base_dir}/shutdown_all_dev_services.sh
echo 'echo "Stopping mysql.."' >> ${base_dir}/shutdown_all_dev_services.sh
echo "${base_dir}/mysql_stop.sh" >> ${base_dir}/shutdown_all_dev_services.sh
echo 'echo "Stopping local memached.."' >> ${base_dir}/shutdown_all_dev_services.sh
echo "${base_dir}/memcached_local_stop.sh" >> ${base_dir}/shutdown_all_dev_services.sh
echo 'echo "Stopping global memached.."' >> ${base_dir}/shutdown_all_dev_services.sh
echo "${base_dir}/memcached_global_stop.sh" >> ${base_dir}/shutdown_all_dev_services.sh
echo 'echo "Stopping redises.."' >> ${base_dir}/shutdown_all_dev_services.sh
echo "${base_dir}/redises_stop.sh" >> ${base_dir}/shutdown_all_dev_services.sh
chmod +x ${base_dir}/shutdown_all_dev_services.sh

echo '#!/bin/bash' > ${base_dir}/start_all_dev_services.sh
echo 'echo "Starting mysql.."' >> ${base_dir}/start_all_dev_services.sh
echo "${base_dir}/mysql_start.sh" >> ${base_dir}/start_all_dev_services.sh
echo 'echo "Starting local memached.."' >> ${base_dir}/start_all_dev_services.sh
echo "${base_dir}/memcached_local_start.sh" >> ${base_dir}/start_all_dev_services.sh
echo 'echo "Starting global memached.."' >> ${base_dir}/start_all_dev_services.sh
echo "${base_dir}/memcached_global_start.sh" >> ${base_dir}/start_all_dev_services.sh
echo 'echo "Starting redises.."' >> ${base_dir}/start_all_dev_services.sh
echo "${base_dir}/redises_start.sh" >> ${base_dir}/start_all_dev_services.sh
chmod +x ${base_dir}/start_all_dev_services.sh

memcached_local_pid_escaped=$(echo $memcached_local_pid | sed -e 's/[\/&]/\\&/g')
memcached_global_pid_escaped=$(echo $memcached_global_pid | sed -e 's/[\/&]/\\&/g')
sed -e "s/@MYSQL_PID/$mysql_pid_escaped/g" -e "s/@MEMCACHED_LOCAL_PID/$memcached_local_pid_escaped/g" -e "s/@MEMCACHED_GLOBAL_PID/$memcached_global_pid_escaped/g" -e "s/@REDIS_MASTER_PID/$redis_master_pid_escaped/g" -e "s/@REDIS_SLAVE_PID/$redis_slave_pid_escaped/g" <get_services_status-skel.sh > ${base_dir}/get_services_status.sh
chmod +x ${base_dir}/get_services_status.sh

## README
echo "$developer's settings" > ${base_dir}/README
echo "" >> ${base_dir}/README
echo "mysql" >> ${base_dir}/README
echo " host 127.0.0.1" >> ${base_dir}/README
echo " port $mysql_port" >> ${base_dir}/README
echo " pass $PASS" >> ${base_dir}/README
echo "" >> ${base_dir}/README
echo "memcached" >> ${base_dir}/README
echo " host 127.0.0.1" >> ${base_dir}/README
echo " local port $memcached_local_port" >> ${base_dir}/README
echo " global port $memcached_global_port" >> ${base_dir}/README
echo "" >> ${base_dir}/README
echo "redises" >> ${base_dir}/README
echo " host 127.0.0.1" >> ${base_dir}/README
echo " master port $redis_master_port" >> ${base_dir}/README
echo " slave port $redis_slave_port" >> ${base_dir}/README
