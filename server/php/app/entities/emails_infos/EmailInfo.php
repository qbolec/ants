<?php
class EmailInfo extends AbstractEditableEntity implements IEmailInfo
{
  public function get_family(){
    return EmailsInfos::get_instance();
  }
  
  public function get_created_at(){
    return $this->get_field('created_at');
  }

  public function get_updated_at(){
    return $this->get_field('updated_at');
  }

  public function get_type_id(){
    return $this->get_field('type');
  }
  public function get_type(){
    return EmailInfoTypes::get_instance()->get_by_id($this->get_type_id());
  }
  public function get_token(){
    return sha1($this->get_address() . '|' . Config::get_instance()->get('signatures/secret'));
  }

  public function get_address(){
    return $this->get_field('address');
  }
  public function get_state_id(){
    return $this->get_field('state');
  }

  public function get_state(){
    return EmailInfoStates::get_instance()->get_by_id($this->get_state_id());
  }
  
  private function get_state_name(){
    return $this->get_state()->get_name();
  }

  private function set_updated_at($timestamp){
    return $this->set_field('updated_at',$timestamp);
  }

  public function set_state(IEmailInfoState $state){
    $this->set_updated_at(TheApplication::get_instance()->get_time());
    $this->set_field('state',$state->get_id());
  }

  public function to_json(IUser $viewer){
    return array(
      'address' => $this->get_address(),
      'state' => $this->get_state_name(),
    );
  }

}
?>
