<?php
class UsersHandler extends JSONHandler implements IPostJSONHandler
{
  public function get_post_validator(IApplicationEnv $env){
    return new UserRecipeValidator();
  }
  public function get_post_data(IApplicationEnv $env){
    $user_recipe = $env->grab(IApplicationEnv::DATA)->get_data();
    $user = null;
    
    try{
      $user = AuthenticationModule::get_instance()->get_visitor($env);
      if(!$user->is_temporary()){
        $user=null;
      }
    }catch(HTTPUnauthorizedException $e){
    }

    try{
      if($user){
        UsersModule::get_instance()->upgrade($user,$user_recipe);
      }else{
        $user = UsersModule::get_instance()->create($user_recipe);
      }
    }catch(AlreadyExistsException $e){
      //TODO: check if the email is 
      //      connected to an account
      //      if not -- reuse
      //      (look out for R.C.!)
      throw new HTTPConflictException($env);
    }catch(ForbiddenException $e){
      throw new HTTPForbiddenException($env);
    }
    return $user->to_json($user);
  }

}
