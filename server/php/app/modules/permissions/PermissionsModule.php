<?php
class PermissionsModule extends Singleton implements IPermissionsModule
{
  public function has_user_permission(IUser $user,IPermission $permission){
    return $this->has_user_permission_id($user,$permission->get_id());
  }
  public function has_user_permission_id(IUser $user,$permission_id){
    $has_roles_ids = $this->get_user_role_relation()->get_roles_ids_by_user_id($user->get_id());
    $good_roles_ids = $this->get_role_permission_relation()->get_roles_ids_by_permission_id($permission_id);
    return 0<count(array_intersect($has_roles_ids,$good_roles_ids));
  }
  public function get_user_role_relation(){
    return UserRoleRelation::get_instance();
  }
  public function get_role_permission_relation(){
    return RolePermissionRelation::get_instance();
  }
  public function could_anyone_manage_role_of_user(IRole $role,IUser $user){
    if($role->get_name()==IRoles::ROOT_NAME){
      return false;
    }
    return true;
  }
  public function can_user_edit_material_skill_relevance(IUser $editor){
    return $this->has_user_permission_id($editor,IPermissions::EDITING_MATERIAL_SKILL_RELEVANCE);
  }
  public function can_user_see_material(IUser $viewer,IMaterial $material){
    return true;
  }
  public function can_user_create_task_template(IUser $creator){
    return $this->has_user_permission_id($creator,IPermissions::CREATING_TASK_TEMPLATE);
  }
  public function can_user_create_skill(IUser $creator){
    return $this->has_user_permission_id($creator,IPermissions::CREATING_SKILL);
  }
  public function can_user_manage_role_of_user(IUser $manager,IRole $role,IUser $user){
    if(!$this->could_anyone_manage_role_of_user($role,$user)){
      return false;
    }
    if($this->has_user_permission_id($manager,IPermissions::MANAGING_ANY_ROLE)){
      return true;
    }
    return false;
  }
  public function can_user_edit_private_user_data(IUser $actor,IUser $user){
    return $user->get_id() == $actor->get_id() || $this->has_user_permission_id($actor,IPermissions::EDITING_PRIVATE_USER_DATA);
  }
  public function can_user_see_users_fields(IUser $visitor,array $fields){
    $users_module = UsersModule::get_instance();
    if($this->has_user_permission_id($visitor,IPermissions::VIEWING_PRIVATE_USER_DATA)){
      $allowed = $users_module->get_all_searchable_fields();
    }else{
      $allowed = $users_module->get_public_searchable_fields();
    }
    return Arrays::is_subset($fields,$allowed);
  }
  public function can_user_edit_skill(IUser $editor,ISkill $skill){
    return $this->has_user_permission_id($editor,IPermissions::EDITING_ANY_SKILL) ||
      $this->has_user_permission_id($editor,IPermissions::EDITING_OWN_SKILL) && $skill->get_editor_id()==$editor->get_id();
  }
  public function can_user_see_skill(IUser $viewer,ISkill $skill){
    return $this->has_user_permission_id($viewer,IPermissions::VIEWING_ANY_SKILL);
  }
  public function can_user_see_user_private_data(IUser $viewer,IUser $user){
    return $viewer->get_id() == $user->get_id() || $this->has_user_permission_id($viewer,IPermissions::VIEWING_PRIVATE_USER_DATA);
  }
  public function can_user_edit_task_template(IUser $editor,ITaskTemplate $template){
    return $this->has_user_permission_id($editor,IPermissions::EDITING_ANY_TASK_TEMPLATE) ||
      $this->has_user_permission_id($editor,IPermissions::EDITING_OWN_TASK_TEMPLATE) && $template->get_editor_id() == $editor->get_id(); 
  }
  public function can_user_see_task_template(IUser $viewer,ITaskTemplate $template){
    return $this->has_user_permission_id($viewer,IPermissions::VIEWING_ANY_TASK_TEMPLATE);
  }
  public function can_user_see_question(IUser $viewer,IQuestion $question){
    return in_array($question->get_user_id(),array(null,$viewer->get_id()));//TODO mentors
  }
  public function can_user_answer_question(IUser $viewer,IQuestion $question){
    return $question->get_user_id() == $viewer->get_id();
  }
  /*
  public function can_user_see_products_fields(IUser $visitor,array $fields){
    $shop_id = $visitor->get_shop_id();
    if(null === $shop_id){
      return false;
    }
    if(!$this->has_user_permission_id($visitor,IPermissions::VIEWING_PRODUCT_INFO)){
      return false;
    }
    $products_module = ProductsModule::get_instance();
    if($this->has_user_permission_id($visitor,IPermissions::VIEWING_PRODUCT_RAW_INFO)){
      $allowed = $products_module->get_all_searchable_fields();
    }else{
      $allowed = $products_module->get_public_searchable_fields();
    }
    return Arrays::is_subset($fields,$allowed);
  }
  */

}
?>
