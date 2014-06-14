<?php
class PlayersHandler extends JSONHandler implements IGetJSONHandler
{
  public function get_get_validator(IApplicationEnv $env){
    return new AnythingValidator();
  }
  public function get_get_data(IApplicationEnv $env){
    $users = Users::get_instance()->multi_get_by_ids(UsersRelation::get_instance()->get_all_ids());
    $result = array();
    foreach($users as $user){
      if($user->get_email_state_id() == IEmailInfoStates::CONFIRMED){
        $name = $user->get_displayed_nick();
        if($user->get_ast()!==null && !$user->is_open_source()){
          $result[] = array(
            'name' => $name,
            'ast' => $user->get_ast(),
          );
        }else{
          $result[] = array(
            'name' => $name,
            'source' => $user->get_source(),
          );
        }
      }
    }
    return $result;
  }

}
