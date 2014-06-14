<?php
class UsersSourceHandler extends JSONHandler implements IPutJSONHandler
{
  public function get_put_validator(IApplicationEnv $env){
    return new StringValidator();
  }
  public function get_put_data(IApplicationEnv $env){
    $source = $env->grab(IApplicationEnv::DATA)->get_data();
    $visitor = AuthenticationModule::get_instance()->get_visitor($env);
    $visitor->set_source($source);
    return $visitor->to_json($visitor);
  }

}
