<?php
interface IUser extends IEntity
{
  
  public function get_created_at();


  public function get_salt();

  public function get_password_hash();

  public function get_email_state_id();

  public function get_email();

  public function set_email_state_id($state_id);

  public function get_change_password_token();

}
?>
