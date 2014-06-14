<?php
abstract class AbstractTypesEntities extends AbstractEntities implements ITypesEntities
{
  abstract protected function get_id_to_class_name();
  
  public function get_by_id($id){
    try{
      $class_name = Arrays::grab($this->get_id_to_class_name(),$id);
    }catch(IsMissingException $e){
      throw new NoSuchEntityException($id);
    }
    $data = array(
      'id' => $id,
    );
    return new $class_name($data);
  }
  public function get_fields_descriptor(){
    return FieldsDescriptorFactory::get_instance()->get_from_array(array(
      'id' => new IntFieldType(),
    ));
  }
}
?>
