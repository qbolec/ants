#!/bin/bash

if [[ -n $1 ]]
then
  tag=$1
else
  echo "Skladnia:"
  echo "  generate_deployment_pack.sh tag-number"
  exit
fi

tags_dir=~/production-ants/tags
mkdir -p $tags_dir
current_tag=$tags_dir/$tag

if [[ -d "$current_tag" ]]
then
  echo "Katalog $current_tag istnieje! Jesli mimo wszystko chcesz utworzyc paczke z kodem usun ten katalog i sprobuj ponownie."
  exit
else
  echo "Tworzenie paczki z kodem do katalogu $current_tag"
fi

echo "Generating PHP"

echo '- index.php'
mkdir -p $current_tag/php
cp ../htdocs/index.php $current_tag/php/

echo '- includes'
mkdir -p $current_tag/php/includes
find ../server/php/ '(' -name '*.php' ')' -type f -exec cp '{}' $current_tag/php/includes/ \;
find ../server/phtml/ '(' -name '*.phtml' ')' -type f -exec cp '{}' $current_tag/php/includes/ \;

echo '- cli scripts'
mkdir -p $current_tag/php/cli
cp -R ../server/cli/ $current_tag/php/
find $current_tag/php/cli -name ".svn" | xargs rm -Rf
#find $current_tag/php/cli -name ".svn" -delete;

echo '- config'
cp $current_tag/php/includes/ConfigProduction.php $current_tag/php/includes/Config.php

echo "Generating STATIC"

mkdir -p $current_tag/static
mkdir -p $current_tag/static/static

echo '- communciation frame'
cp ../htdocs/communicationFrame.html $current_tag/static/static/communicationFrame.html
cp ../htdocs/easyXDM.min.js $current_tag/static/static/easyXDM.min.js
cp ../htdocs/easyxdm.swf $current_tag/static/static/easyxdm.swf

echo '- xml file'
mkdir -p $current_tag/static/html
(cd ../client/html ;  php -d include_path=$current_tag/php/includes index.xml) > $current_tag/static/html/index.xml

echo '- folders'
for x in {css,html/templates,js,images};
do cp -r ../client/$x $current_tag/static/$x;
done

echo "Generating SQLs"
mkdir -p $current_tag/sql

echo '- initial sql scripts'
cp -r ../server/sql $current_tag/sql/init

echo '- migrations'
cp -r ../server/migrations $current_tag/sql/migrations

echo "Cleaning svn files"
find $current_tag -name "\.svn" -prune -exec rm -rf {} \;

echo "Preparing archives"
tar -C $current_tag -czf $current_tag/tag-$tag.tar.gz php sql static
tar -C $current_tag/php -czf $current_tag/tag-$tag.app.tar.gz includes cli ../sql index.php
tar -C $current_tag/sql -czf $current_tag/tag-$tag.sql.tar.gz init migrations
tar -C $current_tag/php -czf $current_tag/tag-$tag.cli.tar.gz cli
tar -C $current_tag/static -czf $current_tag/tag-$tag.static.tar.gz html js images css static
