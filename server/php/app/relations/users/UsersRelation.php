<?php
class UsersRelation extends ConfigurableRelation implements IUsersRelation
{
  public function __construct(){
    parent::__construct('users');
  }
  public function get_all_ids(){
    return Arrays::grab(Arrays::transpose($this->get_manager()->get_all(array(
    ))),'id');
  }
  public function get_id_by_email($email){
    return Arrays::grab($this->get_manager()->get_single_row(array(
      'email' => $email,
    )),'id');
  }
  public function get_fields_descriptor(){
    return FieldsDescriptorFactory::get_instance()->get_from_array(array(
      'id' => new IntFieldType(),
      'email' => new StringFieldType(),      
    ));
  }
}
?>
