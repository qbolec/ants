<?php
class Permissions extends AbstractNamedEntities implements IPermissions
{
  protected function get_id_to_name(){
    return array(
      self::VIEWING_PRIVATE_USER_DATA => 'VIEWING_PRIVATE_USER_DATA',
      self::EDITING_PRIVATE_USER_DATA => 'EDITING_PRIVATE_USER_DATA',
      self::CREATING_TASK_TEMPLATE => 'CREATING_TASK_TEMPLATE',
      self::CREATING_SKILL => 'CREATING_SKILL',
      self::MANAGING_ANY_ROLE => 'MANAGING_ANY_ROLE',
      self::EDITING_ANY_TASK_TEMPLATE => 'EDITING_ANY_TASK_TEMPLATE',
      self::EDITING_OWN_TASK_TEMPLATE => 'EDITING_OWN_TASK_TEMPLATE',
      self::EDITING_ANY_SKILL => 'EDITING_ANY_SKILL',
      self::EDITING_OWN_SKILL => 'EDITING_OWN_SKILL',
      self::VIEWING_ANY_SKILL => 'VIEWING_ANY_SKILL',
      self::VIEWING_ANY_TASK_TEMPLATE => 'VIEWING_ANY_TASK_TEMPLATE',
      self::EDITING_MATERIAL_SKILL_RELEVANCE => 'EDITING_MATERIAL_SKILL_RELEVANCE',
    );
  }
  protected function from_data(array $data){
    return new Permission($data);
  }
}
?>
