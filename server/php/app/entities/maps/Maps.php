<?php
class Maps extends ConfigurableEntities implements IMaps
{
  public function __construct(){
    parent::__construct('map');
  }
  protected function from_data(array $data){
    return new Map($data);
  }
  public function create(array $data){
    //TODO:
    return $this->insert_and_assign_id($data);
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
