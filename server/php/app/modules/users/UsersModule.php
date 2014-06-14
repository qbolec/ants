<?php
class UsersModule extends Singleton implements IUsersModule{
  public function get_user_by_id($id){
    return Users::get_instance()->get_by_id($id);
  }
  public function get_user_by_username($username){
    $id = UsersRelation::get_instance()->get_id_by_email($username);
    return $this->get_user_by_id($id);
  }
  public function upgrade(IUser $user,array $user_recipe){
    $lock = $user->begin(); 
    if($user->is_temporary()){
      $username = $user_recipe['credentials']['username'];
      $password = $user_recipe['credentials']['password'];
      $user->set_email($username);
      $user->set_password($password);
      $user->set_is_temporary(false);
      try{
        $user->commit($lock);
      }catch(PDOException $pe){
        try{
          UsersRelation::get_instance()->get_id_by_email($username);
          throw new AlreadyExistsException($username);
        }catch(IsMissingException $me){
          throw $pe;
        }
      }
      $this->send_confirmation_email($user);
    }else{
      $user->commit($lock);
      throw new ForbiddenException();
    }
  }
  public function create(array $user_recipe){
    $username = $user_recipe['credentials']['username'];
    $password = $user_recipe['credentials']['password'];
    $user_data = array(
      'email' => $username,
      'password' => $password,
      'is_open_source' => 1,
      'ast' => null,
      'nick' => null,
      'source' => 'state ->
    {
        action: move UP,
        hormones : {
            r:  state.r+1,
            g:  state.g,
            b:  10,
        }
    }',
    );
    $user = Users::get_instance()->create($user_data);
    $this->send_confirmation_email($user);
    return $user;
  }
  private function send_confirmation_email(IUser $user){
    $query = http_build_query(array(
      'id' => $user->get_id(),
      'address' => $user->get_email(),
      'token' => $user->get_email_token(),
    ));
    $url = Config::get_instance()->get('endpoints/confirm_email/USER') . '?' . $query;  
    Framework::get_instance()->get_mails()->get_mail(
      array($user->get_email()),
      //TODO: texty powinny być gdzie indziej
      //TODO: texty powinny zależeć od Accept-language
      //TODO: nazwa serwisu
      'Potwierdź adres email',
      'Kliknij ten link ' .
      $url . ' aby potwierdzić, że adres ' . $user->get_email() . ' należy do Ciebie ' .
      'i że chcesz aktywować konto w serwisie ants. Jeśli nie to było Twoim zamiarem, zignoruj tego maila.'
    )->send();
  }
  public function on_password_change_request(IUser $user){
    if($user->get_email_state_id() == IEmailInfoStates::CONFIRMED){
      $this->send_change_password_email($user);
    }else{
      $this->send_confirmation_email($user);
    }
  }
  private function send_change_password_email(IUser $user){
    $query = http_build_query(array(
      'id' => $user->get_id(),
      'address' => $user->get_email(),
      'token' => $user->get_change_password_token(),
    ));
    $url = Config::get_instance()->get('endpoints/change_password') . '?' . $query;  
    Framework::get_instance()->get_mails()->get_mail(
      array($user->get_email()),
      //TODO: texty powinny być gdzie indziej
      //TODO: texty powinny zależeć od Accept-language
      //TODO: nazwa serwisu
      'Potwierdź zmianę hasła',
      'Kliknij ten link ' .
      $url . ' aby zmienić hasło przypisane do adresu ' . $user->get_email() . ' w serwisie ants.' .
      'Jeśli nie to było Twoim zamiarem, zignoruj tego maila.'
    )->send();
  }
  private function get_view_spec(){
    return array(
      'main_table' => 'user',
      'field_to_extension' => array(
        'shopId' => 'shop',
        'shopName' => 'shop',
        'username' => 'email',
        'email' => 'email',
      ),
      'extensions' => array(
        'shop' => '
          LEFT JOIN shop_worker ON (shop_worker.user_id = user.id AND shop_worker.state_id > 2) 
          LEFT JOIN shop ON (shop.id = shop_worker.shop_id)',
        'email' => '
          LEFT JOIN email_info ON (email_info.id = user.email_id)', 
      ),
      'field_to_expression' => array(
        'id' => 'user.id',
        'state' => 'IF(user.state,"ACTIVE","NOT_ACTIVE")',
        'firstName' => 'user.first_name',
        'lastName' => 'user.last_name',
        'username' => 'email_info.address',
        'email' => 'email_info.address',
        'shopId' => 'shop.id',
        'shopName' => 'shop.name',
        'name' => 'CONCAT(user.first_name," ",user.last_name)',
        'msn' => 'user.msn',
        'phone' => 'user.phone',
        'skype' => 'user.skype',
      ),
    );
  }
  public function select_count(IPredicate $predicate,IUser $visitor){
    $referenced_fields = $predicate->get_referenced_fields();
    if(!PermissionsModule::get_instance()->can_user_see_users_fields($visitor,$referenced_fields)){
      throw new UnauthorizedException("Can't reference fields " . implode(',',$referenced_fields));
    }
    $pdo = Framework::get_instance()->get_pdo_factory()->get_pdo('main',0);
    return QueriesModule::get_instance()->select_count(
      $predicate,
      $pdo,
      $this->get_view_spec()
    );
  }
  public function select_ids(ISelectQuery $select_query,IUser $visitor){
    $referenced_fields = $select_query->get_referenced_fields();
    if(!PermissionsModule::get_instance()->can_user_see_users_fields($visitor,$referenced_fields)){
      throw new UnauthorizedException("Can't reference fields " . implode(',',$referenced_fields));
    }
    $pdo = Framework::get_instance()->get_pdo_factory()->get_pdo('main',0);
    return QueriesModule::get_instance()->select_ids(
      $select_query,
      $pdo,
      'user.id',
      $this->get_view_spec()
    );
  }
  public function get_public_searchable_fields(){
    return array(
      'id',
      'state',
      'shopId',
      'shopName',
    );
  }
  public function get_all_searchable_fields(){
    return array(
      'id',
      'firstName',
      'lastName',
      'username',
      'email',
      'state',
      'shopId',
      'shopName',
      'name',
      'msn',
      'phone',
      'skype',
    );
  }
}
?>
