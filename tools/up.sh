#!/bin/bash
svn up
tools=~/ants/active/tools
$tools/update_config.sh && $tools/save_config.sh
$tools/reswitch_project.sh
