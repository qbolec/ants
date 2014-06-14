<?php
class UsersPasswordsChangeHandler extends JSONHandler implements IPostJSONHandler
{
  public function get_post_validator(IApplicationEnv $env){
    return new PasswordChangeValidator();
  }
  public function get_post_data(IApplicationEnv $env){
    $password_change = $env->grab(IApplicationEnv::DATA)->get_data();
    $username = $password_change['credentials']['username'];
    $users_module = UsersModule::get_instance();
    try{
      $user = $users_module->get_user_by_username($username);
      if($user->get_change_password_token()===$password_change['token']){
        if($user->get_email_state_id() == IEmailInfoStates::CONFIRMED){
          $user->set_password($password_change['credentials']['password']);
          return null;
        }else{
          throw new HTTPForbiddenException($env);
        }
      }else{
        throw new HTTPUnauthorizedException($env);
      }
    }catch(IsMissingException $e){
      throw new HTTPNotFoundException($env);
    }
  }

}
