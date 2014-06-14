#!/bin/bash
working_copy=~/ants/active
current_project_name=`ls -l $working_copy | egrep -o '[^/]+\$'`
tools="$working_copy/tools"
echo reswitching $current_project_name
$tools/switch_project.sh $current_project_name
