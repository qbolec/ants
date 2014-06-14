#!/bin/bash
working_copy=~/ants/active
tools="$working_copy/tools"
config_patch=~/ants/Config.patch
config_base=ConfigAlpha.php
config=Config.php
includes=~/ants/app/includes
phtml="$working_copy/server/phtml"
php="$working_copy/server/php"
lib="$working_copy/server/lib"
project=~/projects/ants/$1

if [ -z "$1" ]
then
  echo "ERROR: nie podano na co mam sie przepiac!"
  echo "Poprawne uzycie: ./switch_project katalog_na_ktory_chce_sie_przepiac"
  exit -1;
fi

if [ ! -e $project ];
then
  echo nie istnieje $project;
  exit -1;
fi
echo sprawdzanie czy zasavewowany patch jest aktualny
cd $includes || exit 1
diff --label Config --label Config -u $config_base $config | diff - $config_patch || exit 1
echo przepinanie
rm $working_copy
ln -s $project $working_copy

echo czyszczenie includów
rm -rf *

echo tworzenie includów
find $php/ '(' -name '*.php' ')' -type f -exec ln -s -f '{}' \;
find $phtml/ '(' -name '*.phtml' ')' -type f -exec ln -s -f '{}' \;
for x in $lib/*; do ln -s $x;done

$tools/update_config.sh
$tools/save_config.sh
