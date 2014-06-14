<?php
abstract class AbstractNamedEntities extends AbstractEntities implements INamedEntities
{
  abstract protected function get_id_to_name();

  public function get_fields_descriptor(){
    return FieldsDescriptorFactory::get_instance()->get_from_array(array(
      'id' => new IntFieldType(),
      'name' => new StringFieldType(),
    ));
  }

  public function get_all_names(){
    return array_values($this->get_id_to_name());
  }
  
  protected function get_name_by_id($id){
    $mapping = $this->get_id_to_name();
    if(!array_key_exists($id,$mapping)){
      throw new NoSuchEntityException($id);
    }
    return $mapping[$id];
  }
  
  public function get_id_by_name($name){
    $mapping = array_flip($this->get_id_to_name());
    return Arrays::grab($mapping,$name);
  }

  public function get_by_name($name){
    return $this->get_by_id($this->get_id_by_name($name));
  }

  public function get_by_id($id){
    return $this->from_data(array(
      'id' => $id,
      'name' => $this->get_name_by_id($id),
    ));
  }
}
?>
