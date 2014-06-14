<?php
interface IRolePermissionRelation extends IRelation, IGetInstance
{
  public function get_roles_ids_by_permission_id($permission_id);
  public function get_permissions_ids_by_role_id($role_id);
}
?>
