<?php
class RolesRelation extends ConfigurableRelation implements IRolesRelation
{
  public function __construct(){
    parent::__construct('roles');
  }
  public function get_id_by_name($name){
    return Arrays::grab($this->get_manager()->get_single_row(array(
      'name' => $name,
    )),'id');
  } 
  public function get_all_ids(){
    return Arrays::get(
      Arrays::transpose(
        $this->get_manager()->get_all(
          array(),array('id'=>IRelationManager::ASC)
        )
      ),
      'id',
      array()
    );
  }
  public function get_fields_descriptor(){
    return FieldsDescriptorFactory::get_instance()->get_from_array(array(
      'id' => new IntFieldType(),
      'name' => new StringFieldType(),
    ));
  }
}
?>
