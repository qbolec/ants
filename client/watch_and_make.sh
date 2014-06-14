#!/bin/bash
new_list=/tmp/new_list.ants
old_list=/tmp/old_list.ants
for((;;))
do
  ls -ltc ts/*.ts jst/*.jst css/*.styl | head > $new_list
  diff $old_list $new_list
  if [ $? != 0 ];
  then
    cp $new_list $old_list ;
    echo "changed!";
    sleep 1
    make
    echo -e "done\a";
  fi
  sleep 1
done
