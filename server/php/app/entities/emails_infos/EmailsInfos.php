<?php
class EmailsInfos extends ConfigurableEntities implements IEmailsInfos
{
  public function __construct(){
    parent::__construct('email_info');
  }
  protected function from_data(array $data){
    return new EmailInfo($data);
  }

  public function create(array $data){
    $email_info = $this->insert_and_assign_id($data);
    return $email_info;
  }
  public function confirm_shop_email(IShop $shop,IEmailInfo $email_info){
    $email_info->set_state(EmailInfoStates::get_instance()->get_by_id(IEmailInfoStates::CONFIRMED));
  }
  public function confirm_user_email(IUser $user,IEmailInfo $email_info){
    $lock = $this->get_user_emails_lock();
    $relation = EmailsInfosRelation::get_instance();
    if($relation->user_email_exists($email_info->get_address())){
      $lock->release();
      throw new AlreadyExistsException($email_info->get_address()); 
    }
    $email_info->set_state(EmailInfoStates::get_instance()->get_by_id(IEmailInfoStates::CONFIRMED));
    $lock->release();
  }
  private function get_user_emails_lock(){
    $framework = Framework::get_instance();
    $lock_factory = $framework->get_lock_factory();
    return $lock_factory->get_lock('emails_infos/user_email');
  }
  public function create_shop_email(IShop $shop,$address){
    $app = TheApplication::get_instance();
    
    $time = $app->get_time();
    $data = array(
      'created_at' => $time,
      'updated_at' => $time,
      'type' => IEmailInfoTypes::SHOP_NOTIFICATIONS,
      'address' => $address,
      'state' => IEmailInfoStates::UNCONFIRMED,
    );
    $email_info = $this->create($data);
    return $email_info;
  }
  public function create_user_email($address){
    $app = TheApplication::get_instance();
    $lock = $this->get_user_emails_lock();
    $relation = EmailsInfosRelation::get_instance();
    if($relation->user_email_exists($address)){
      $lock->release();
      throw new AlreadyExistsException($address); 
    }

    $time = $app->get_time();
    $data = array(
      'created_at' => $time,
      'updated_at' => $time,
      'type' => IEmailInfoTypes::USER,
      'address' => $address,
      'state' => IEmailInfoStates::UNCONFIRMED,
    );
    $email_info = $this->create($data);
    $lock->release();
    return $email_info;
  }
  public function get_fields_descriptor(){
    return FieldsDescriptorFactory::get_instance()->get_from_array(array(
      'id' => new IntFieldType(),
      'created_at' => new IntFieldType(),
      'updated_at' => new IntFieldType(),
      'type' => new IntFieldType(),
      'address' => new StringFieldType(),
      'state' => new IntFieldType(),      
    ));
  }
}
?>
