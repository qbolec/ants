<?php
interface ITheApplication extends IApplication
{
  public function get_sharded_pdo();
  public function get_time();
}
?>
