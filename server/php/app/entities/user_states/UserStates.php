<?php
class UserStates extends AbstractNamedEntities implements IUserStates
{
  protected function get_id_to_name(){
    return array(
      self::ACTIVE => 'ACTIVE',
      self::NOT_ACTIVE => 'NOT_ACTIVE',
    );
  }
  protected function from_data(array $data){
    return new UserState($data);
  }
}
?>
