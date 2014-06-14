<?php
interface IPermissionsModule extends IGetInstance
{
  public function has_user_permission(IUser $user,IPermission $permission);
  public function has_user_permission_id(IUser $user,$permission_id);
  public function get_user_role_relation();
  public function get_role_permission_relation();
  public function can_user_manage_role_of_user(IUser $manager,IRole $role,IUser $user);
  public function can_user_see_users_fields(IUser $visitor,array $fields);
}
?>
