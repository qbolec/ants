#!/bin/bash
working_copy=~/ants/active
config_patch=~/ants/Config.patch
config_base=ConfigAlpha.php
config=Config.php
includes=~/ants/app/includes


cd $includes || exit 1
if [ -e $config ];
then
  if [ -e $config_base ];
  then
    diff --label Config --label Config -u $config_base $config > $config_patch;
    exit 0;
  else
    echo "base is missing";
    exit 1;
  fi
else
  if [ -e $config_base ];
  then
    echo "base exists, but ext is missing";
    exit 2;
  else
    echo "both are missing";
    exit 3;
  fi
fi
