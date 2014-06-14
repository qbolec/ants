#!/bin/bash

is_tag=`svn info .. | grep "URL: file:///svn/ants/tags" | wc -l`

if [ $is_tag -eq 0 ]
then
  echo "Aktualne repozytorium nie wyglada na sciagniete z file:///svn/ants/tags! Nie moge utworzyc taga!"
  exit
fi

tag=`svn info .. | grep "URL: file:///svn/ants/tags" | sed -e "s/URL: file:\/\/\/svn\/ants\/tags\///"`
echo "Przygotowanie paczki do deploymentu dla tagu $tag..."

active=`ls -l ~/ants/ | grep " active" | sed -e "s/.*projects\/ants\///"`

if [ ! "$active" == "$tag" ]
then
  echo "Aktualnie working_copy nie linkuje do tagu $tag! Do przygotowania deploymentowej paczki niezbedne jest skonfigurowanie kodu lokalnie."
  echo "Wykonaj: switch_project $tag!"
  exit
fi

echo "Generowanie paczki deploymentowej dla taga $tag.."
./generate_deployment_pack.sh $tag

echo "Paczka znajduje sie w katalogu ~/production-ants/tags/$tag"
