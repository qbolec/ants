<?php
class Roles extends ConfigurableEntities implements IRoles
{
  public function __construct(){
    parent::__construct('role');
  }
  protected function from_data(array $data){
    return new Role($data);
  }
  public function get_fields_descriptor(){
    return FieldsDescriptorFactory::get_instance()->get_from_array(array(
      'id' => new IntFieldType(),
      'name' => new StringFieldType(),
      'description' => new StringFieldType(),      
    ));
  }
}
?>
