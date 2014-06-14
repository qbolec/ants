<?php
class UserRoleRelation extends ConfigurableRelation implements IUserRoleRelation
{
  public function __construct(){
    parent::__construct('user_role');
  }
  public function remove($user_id,$role_id){
    return $this->get_manager()->delete(array(
      'user_id' => $user_id,
      'role_id' => $role_id,
    ));
  }
  public function add($user_id,$role_id){
    return $this->get_manager()->insert(array(
      'user_id' => $user_id,
      'role_id' => $role_id,
    ));
  }
  public function get_roles_ids_by_user_id($user_id){
    return $this->get_manager()->get_single_column(array(
      'user_id'=>$user_id,
    ));
  }
  public function get_users_ids_by_role_id($role_id){
    return $this->get_manager()->get_single_column(array(
      'role_id'=>$role_id,
    ));
  }
  public function get_fields_descriptor(){
    return FieldsDescriptorFactory::get_instance()->get_from_array(array(
      'user_id' => new IntFieldType(),
      'role_id' => new IntFieldType(),
    ));
  }
}
?>
