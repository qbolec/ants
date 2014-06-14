<?php
class UsersMeHandler extends JSONHandler implements IGetJSONHandler
{
  public function get_get_validator(IApplicationEnv $env){
    return new NullValidator();
  }
  public function get_get_data(IApplicationEnv $env){
    $visitor = AuthenticationModule::get_instance()->get_visitor($env);
    return $visitor->to_json($visitor);
  }

}
