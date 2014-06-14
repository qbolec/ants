<?php
class LoginHandler extends JSONHandler implements IPostJSONHandler
{
  public function get_post_validator(IApplicationEnv $env){
    return new CredentialsValidator();
  }
  public function get_post_data(IApplicationEnv $env){
    $credentials = $env->grab(IApplicationEnv::DATA)->get_data();
    try{
      $user = UsersModule::get_instance()->get_user_by_username($credentials['username']);
    }catch(IsMissingException $e){
      throw new HTTPNotFoundException($env);
    }
    if($user->is_correct_password($credentials['password'])){
      if($user->get_email_state_id() == IEmailInfoStates::CONFIRMED){ 
        $token = AuthenticationModule::get_instance()->generate_token($user);
      }else{
        throw new HTTPForbiddenException($env);
      }
    }else{
      throw new HTTPUnauthorizedException($env);
    }
    return array(
      'authenticationToken' => $token,
      'userId' => $user->get_id(),
    );
  }

}
