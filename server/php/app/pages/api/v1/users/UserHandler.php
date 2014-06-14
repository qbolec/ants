<?php
class UserHandler extends JSONHandler implements IGetJSONHandler
{
  public function get_get_validator(IApplicationEnv $env){
    return new AnythingValidator();
  }
  public function get_get_data(IApplicationEnv $env){
    $user = $env->grab(ITheApplicationEnv::USER);
    $visitor = AuthenticationModule::get_instance()->get_visitor($env);
    try{
      return $user->to_json($visitor);
    }catch(UnauthorizedException $e){
      throw new HTTPUnauthorizedException($env);
    }
  }

}
