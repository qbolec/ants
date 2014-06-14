<?php
class UsersASTHandler extends JSONHandler implements IPutJSONHandler
{
  public function get_put_validator(IApplicationEnv $env){
    return new NullableValidator(new StringValidator());
  }
  public function get_put_data(IApplicationEnv $env){
    $ast = $env->grab(IApplicationEnv::DATA)->get_data();
    $visitor = AuthenticationModule::get_instance()->get_visitor($env);
    $visitor->set_ast($ast);
    return $visitor->to_json($visitor);
  }

}
