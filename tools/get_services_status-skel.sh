#!/bin/bash

#mysql
if [ -e @MYSQL_PID ]
then
  mysql_pid=$(cat @MYSQL_PID)
  rows=$(ps ax | grep $mysql_pid | grep -v grep | wc -l)
else
  rows=0
fi

if [ "$rows" == "1" ]
then
  echo "MySQL [RUNNING], pid $mysql_pid"
else
  echo "MySQL [NOT FOUND!]"
fi
 
#memcached local
if [ -e @MEMCACHED_LOCAL_PID ]
then
  memcached_local_pid=$(cat @MEMCACHED_LOCAL_PID)
  rows=$(ps ax | grep $memcached_local_pid | grep -v grep | wc -l)
else
  rows=0
fi

if [ "$rows" == "1" ]
then
  echo "Memcached local [RUNNING], pid $memcached_local_pid".
else
  echo "Memcached local [NOT FOUND!]"
fi

#memcached global
if [ -e @MEMCACHED_GLOBAL_PID ]
then
  memcached_global_pid=$(cat @MEMCACHED_GLOBAL_PID)
  rows=$(ps ax | grep $memcached_global_pid | grep -v grep | wc -l)
else
  rows=0
fi

if [ "$rows" == "1" ]
then
  echo "Memcached global [RUNNING], pid $memcached_global_pid".
else
  echo "Memcached global [NOT FOUND!]"
fi

#redis master
if [ -e @REDIS_MASTER_PID ]
then
  master_redis_pid=$(cat @REDIS_MASTER_PID)
  rows=$(ps ax | grep $master_redis_pid | grep -v grep | wc -l)
else
  rows=0
fi

if [ "$rows" == "1" ]
then
  echo "Redis master [RUNNING], pid $master_redis_pid".
else
  echo "Redis master [NOT FOUND!]"
fi

#redis slave
if [ -e @REDIS_SLAVE_PID ]
then
  slave_redis_pid=$(cat @REDIS_SLAVE_PID)
  rows=$(ps ax | grep $slave_redis_pid | grep -v grep | wc -l)
else
  rows=0
fi

if [ "$rows" == "1" ]
then
  echo "Redis slave [RUNNING], pid $slave_redis_pid".
else
  echo "Redis slave [NOT FOUND!]"
fi

echo ""
echo "For connection information check README file"
