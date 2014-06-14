<?php
class TemporaryUserHandler extends JSONHandler implements IPostJSONHandler
{
  public function get_post_validator(IApplicationEnv $env){
    return new NullValidator();
  }
  public function get_post_data(IApplicationEnv $env){
    $user = UsersModule::get_instance()->create_temporary();
    $token = AuthenticationModule::get_instance()->generate_token($user);
    return array(
      'authenticationToken' => $token,
      'userId' => $user->get_id(),
    );
  }

}
