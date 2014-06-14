<?php
class Autoload{
  public static function load($class_name){
    require_once str_replace('\\','/', $class_name . '.php');
  }
}
spl_autoload_register('Autoload::load');
?>
