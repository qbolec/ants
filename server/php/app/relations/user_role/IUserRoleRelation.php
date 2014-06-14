<?php
interface IUserRoleRelation extends IRelation, IGetInstance
{
  public function get_roles_ids_by_user_id($user_id);
  public function get_users_ids_by_role_id($role_id);
  public function add($user_id,$role_id);
  public function remove($user_id,$role_id);
}
?>
