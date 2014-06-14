<?php
class UserFieldHandler extends JSONHandler implements IPutJSONHandler
{
  public function get_put_validator(IApplicationEnv $env){
    return new StringValidator();
  }
  public function get_put_data(IApplicationEnv $env){
    $user = $env->grab(ITheApplicationEnv::USER);
    $field = $env->grab(ITheApplicationEnv::FIELD);
    $visitor = AuthenticationModule::get_instance()->get_visitor($env);
    $value = $env->grab(ITheApplicationEnv::DATA)->get_data();
    if(PermissionsModule::get_instance()->can_user_edit_private_user_data($visitor,$user)){
      $user->set_text_field($field,$value);
      return $value;
    }else{
      throw new HTTPUnauthorizedException($env);
    }
  }

}
