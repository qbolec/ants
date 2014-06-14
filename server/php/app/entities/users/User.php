<?php
class User extends AbstractEditableEntity implements IUser
{
  public function get_family(){
    return Users::get_instance();
  }
  
  public function get_created_at(){
    return $this->get_field('created_at');
  }

  public function get_email_state_id(){
    return $this->get_field('email_state_id');
  }

  public function get_salt(){
    return $this->get_field('salt');
  }

  public function get_source(){
    return $this->get_field('source');
  }
  
  public function set_source($source){
    return $this->set_field('source',$source);
  }
  public function get_password_hash(){
    return $this->get_field('password_hash');
  }
  
  public function set_password_hash($hash){
    return $this->set_field('password_hash',$hash);
  }
  public function set_email($email){
    try{
      $this->set_field('email',$email);
    }catch(PDOException $pe){
      try{
        UsersRelation::get_instance()->get_id_by_email($email);
        throw new AlreadyExistsException($email);
      }catch(IsMissingException $me){
        throw $pe;
      }
    }
  }

  public function get_email(){
    return $this->get_field('email');
  }

  public function set_password($password){
    $this->set_password_hash($this->get_family()->compute_hash($password,$this->get_salt()));
  }
  public function is_correct_password($password){
    return $this->get_password_hash()===$this->get_family()->compute_hash($password,$this->get_salt());
  }

  public function set_email_state_id($state_id){
    $this->set_field('email_state_id',$state_id);
  }
  
  public function get_change_password_token(){
    return Signatures::get_instance()->sign($this->get_id() . '|id/change_password');
  }
  public function get_email_token(){
    return Signatures::get_instance()->sign($this->get_email() . '|email');
  }
  private function can_see(IUser $visitor){
    return PermissionsModule::get_instance()->can_user_see_user_private_data($visitor,$this);
  }
  public function get_nick(){
    return $this->get_field('nick');
  }
  public function get_displayed_nick(){

    return $this->get_nick() ?: preg_replace('/@.*/','',  $this->get_email());
  }
  public function set_nick($nick){
    $this->set_field('nick',$nick);
  }
  public function set_ast($ast){
    $this->set_field('ast',$ast);
  }
  public function set_is_open_source($is_open_source){
    $this->set_field('is_open_source',(int)$is_open_source);
  }
  public function is_open_source(){
    return (bool)$this->get_field('is_open_source');
  }
  public function get_ast(){
    return $this->get_field('ast');
  }

  public function to_json(IUser $visitor){
    if($this->can_see($visitor)){
      return array(
        'id' => $this->get_id(),
        'email' => $this->get_email(),
        'is_open_source' => $this->is_open_source(),
        'source' => $this->get_source(),
        'ast' => $this->get_ast(),
        'nick' => $this->get_displayed_nick(),
      );
    }else{
      throw new UnauthorizedException();
    }
  }

}
?>
