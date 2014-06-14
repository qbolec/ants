<?php
class UserState extends AbstractNamedEntity implements IUserState
{
  public function get_family(){
    return UserStates::get_instance();
  }
}
?>
