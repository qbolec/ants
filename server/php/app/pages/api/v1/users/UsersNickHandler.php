<?php
class UsersNickHandler extends JSONHandler implements IPutJSONHandler
{
  public function get_put_validator(IApplicationEnv $env){
    return new NullableValidator(new StringValidator());
  }
  public function get_put_data(IApplicationEnv $env){
    $nick = $env->grab(IApplicationEnv::DATA)->get_data();
    $visitor = AuthenticationModule::get_instance()->get_visitor($env);
    $visitor->set_nick($nick);
    return $visitor->to_json($visitor);
  }

}
