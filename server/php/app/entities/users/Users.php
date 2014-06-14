<?php
class Users extends ConfigurableEntities implements IUsers
{
  public function __construct(){
    parent::__construct('user');
  }
  protected function from_data(array $data){
    return new User($data);
  }
  public function compute_hash($password,$salt){
    return sha1($salt . '|password|' . $password);
  }
  public function create(array $data){
    $framework = Framework::get_instance();
    $app = TheApplication::get_instance();
    $data['salt'] = dechex( $framework->get_rng()->next() );
    $data['password_hash'] = $this->compute_hash($data['password'],$data['salt']);
    unset($data['password']);
    $data['created_at'] = $app->get_time();
    $data['email_state_id'] = IEmailInfoStates::UNCONFIRMED;
    try{
      return $this->insert_and_assign_id($data);
    }catch(PDOException $pe){
      try{
        UsersRelation::get_instance()->get_id_by_email($data['email']);
        throw new AlreadyExistsException($data['email']);
      }catch(IsMissingException $me){
        throw $pe;
      }
    }
  }
  public function get_fields_descriptor(){
    return FieldsDescriptorFactory::get_instance()->get_from_array(array(
      'id' => new IntFieldType(),
      'is_open_source' => new IntFieldType(),
      'source' => new StringFieldType(),
      'ast' => new NullableFieldType(new StringFieldType()),
      'created_at' => new IntFieldType(),
      'email' => new StringFieldType(),
      'email_state_id' => new IntFieldType(),
      'salt' => new StringFieldType(),
      'nick' => new NullableFieldType(new StringFieldType()),
      'password_hash' => new StringFieldType(),
    ));
  }
}
?>
