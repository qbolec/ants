<?php
interface IEmailInfo extends IEntity
{
  
  public function get_created_at();

  public function get_updated_at();

  public function get_type();

  public function get_address();

  public function get_state();
  public function get_token();

  public function set_state(IEmailInfoState $state);
}
?>
