<?php
class MapsRelation extends ConfigurableRelation implements IMapsRelation
{
  public function __construct(){
    parent::__construct('maps');
  }
  public function get_all(){
    return $this->get_manager()->get_all(array(),array('id'=>IRelationManager::ASC));
  }
  public function get_fields_descriptor(){
    return FieldsDescriptorFactory::get_instance()->get_from_array(array(
      'id' => new IntFieldType(),
      'name' => new StringFieldType(),
      'terrain' => new StringFieldType(),      
    ));
  }
}
?>
