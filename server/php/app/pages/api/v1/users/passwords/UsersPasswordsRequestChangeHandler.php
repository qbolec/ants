<?php
class UsersPasswordsRequestChangeHandler extends JSONHandler implements IPostJSONHandler
{
  public function get_post_validator(IApplicationEnv $env){
    return new EmailValidator();
  }
  public function get_post_data(IApplicationEnv $env){
    $username = $env->grab(IApplicationEnv::DATA)->get_data();
    $users_module = UsersModule::get_instance();
    try{
      $user = $users_module->get_user_by_username($username);
      $users_module->on_password_change_request($user);
    }catch(IsMissingException $e){
      throw new HTTPNotFoundException($env);
    }
    return null;
  }

}
