<?php
class UserEmailsConfirmHandler extends JSONHandler implements IPostJSONHandler
{
  public function get_post_validator(IApplicationEnv $env){
    return new EmailConfirmationValidator();
  }
  public function get_post_data(IApplicationEnv $env){
    $email_confirmation = $env->grab(IApplicationEnv::DATA)->get_data();
    $user = $env->grab(ITheApplicationEnv::USER);
    if($user->get_email()!==$email_confirmation['address']){
      throw new HTTPConflictException($env);
    }
    if($user->get_email_token()!==$email_confirmation['token']){
      throw new HTTPUnauthorizedException($env);
    }
    //R.C.
    if($user->get_email_state_id()==IEmailInfoStates::CONFIRMED){
      throw new HTTPForbiddenException($env);
    }
    $user->set_email_state_id(IEmailInfoStates::CONFIRMED);
    return null;
  }

}
