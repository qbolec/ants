<?php
class UserIsOpenSourceHandler extends JSONHandler implements IPutJSONHandler
{
  public function get_put_validator(IApplicationEnv $env){
    return new BoolValidator();
  }
  public function get_put_data(IApplicationEnv $env){
    $is_open_source = $env->grab(IApplicationEnv::DATA)->get_data();
    $visitor = AuthenticationModule::get_instance()->get_visitor($env);
    $visitor->set_is_open_source($is_open_source);
    return $visitor->to_json($visitor);
  }

}
