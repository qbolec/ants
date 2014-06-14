<?php
class UserRolesHandler extends JSONHandler implements IGetJSONHandler
{
  public function get_get_validator(IApplicationEnv $env){
    return new NullValidator();
  }
  public function get_get_data(IApplicationEnv $env){
    $visitor = AuthenticationModule::get_instance()->get_visitor($env);
    $user = $env->grab(ITheApplicationEnv::USER);
    $permissions_module = PermissionsModule::get_instance();
    return $permissions_module->get_user_role_relation()->get_roles_ids_by_user_id($user->get_id());
  }

}
