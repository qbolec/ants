<?php
class RolePermissionRelation extends ConfigurableRelation implements IRolePermissionRelation
{
  public function __construct(){
    parent::__construct('role_permission');
  }
  public function get_roles_ids_by_permission_id($permission_id){
    return $this->get_manager()->get_single_column(array(
      'permission_id'=>$permission_id,
    ));
  }
  public function get_permissions_ids_by_role_id($role_id){
    return $this->get_manager()->get_single_column(array(
      'role_id'=>$role_id,
    ));
  }
  public function get_fields_descriptor(){
    return FieldsDescriptorFactory::get_instance()->get_from_array(array(
      'permission_id' => new IntFieldType(),
      'role_id' => new IntFieldType(),
    ));
  }
}
?>
