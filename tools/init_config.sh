#!/bin/bash
working_copy=~/ants/active
tools="$working_copy/tools"
config_patch=~/ants/Config.patch
config_base=ConfigAlpha.php
config=Config.php
includes=~/ants/app/includes
phtml="$working_copy/server/phtml"
php="$working_copy/server/php"


cd $includes || exit 1
if [ -e $config ];
then
  if [ -e $config_base ];
  then
    echo "both config files already existed : nothing to do";
    if [ -e $config_patch ];
    then
      echo "config patch existed : nothing to do";
    else
      echo "config patch is missing : generating it";
      $tools/save_config.sh;
    fi
  else
    echo "base config is missing, but $config is present which is possible if you had branch older than NK-34";
    if [ -e $config_patch ];
    then
      echo "config patch existed, which can happen if you moved or deleted working copy files around and symlinks got broken: linking ConfigAlpha.php manually. Please run switch_project.sh after that.";
      rm $config_base;
      ln -s $php/config/$config_base;
    else
      echo "using old config as a base config, just to make switch_project.sh run. Please run switch_project.sh after that.";
      cp $config $config_base;
      echo "config patch is missing : saving";
      $tools/save_config.sh;
    fi
  fi
else
  if [ -e $config_base ];
  then
    echo "base config exists, but private config is missing. This can happen if this is your first checkout : using base config as your config. Please modify $config after that, and run save_config.sh then.";
  else
    echo "both configs (base and yours) are missing. This can happen if switch_project.sh failed : linking ConfigAlpha.php manually.";
    ln -s $php/config/$config_base
  fi
  echo "using base config as yours";
  cp $config_base $config;
  if [ -e $config_patch ];
  then
    echo "config patch existed : applying it";
    patch -p0 $config < $config_patch;
  else
    echo "config patch is missing : using base config as yours and saving (empty) patch";
    $tools/save_config.sh;
  fi  
fi

