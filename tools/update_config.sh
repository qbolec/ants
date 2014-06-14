#!/bin/bash
working_copy=~/ants/active
config_patch=~/ants/Config.patch
config_base=ConfigAlpha.php
config=Config.php
includes=~/ants/app/includes


cd $includes || exit 1
if [ -e $config_base ];
then
  if [ -e $config_patch ];
  then
    echo "patching latest base config";
    cp $config_base $config
    patch -p0 $config < $config_patch;
  else
    echo "patch is missing";
    exit 1;
  fi
else
  echo "base config is missing";
  exit 2;
fi
