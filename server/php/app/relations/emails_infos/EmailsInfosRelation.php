<?php
class EmailsInfosRelation extends ConfigurableRelation implements IEmailsInfosRelation
{
  public function __construct(){
    parent::__construct('emails_infos');
  }
  public function get_id_by_username($address){
    return Arrays::grab($this->get_manager()->get_single_row(array(
      'type' => IEmailInfoTypes::USER,
      'state' => IEmailInfoStates::CONFIRMED,
      'address' => $address,
    )),'id');
  }

  public function user_email_exists($address){
    return 0<$this->get_manager()->get_count(array(
      'type' => IEmailInfoTypes::USER,
      'state' => IEmailInfoStates::CONFIRMED,
      'address' => $address,
    ));
  }
  public function get_fields_descriptor(){
    return FieldsDescriptorFactory::get_instance()->get_from_array(array(
      'id' => new IntFieldType(),
      'created_at' => new IntFieldType(),
      'updated_at' => new IntFieldType(),
      'type' => new IntFieldType(),
      'state' => new IntFieldType(),
      'address' => new StringFieldType(),
    ));
  }
}
?>
