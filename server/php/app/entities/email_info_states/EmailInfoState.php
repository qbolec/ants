<?php
class EmailInfoState extends AbstractNamedEntity implements IEmailInfoState
{
  public function get_family(){
    return EmailInfoStates::get_instance();
  }
}
?>
