<?php
class CredentialsValidator extends RecordValidator
{
  public function __construct(){
    parent::__construct(array(
      'username' => new EmailValidator(),
      'password' => new PCREValidator('/./'),
    ));
  }
}
?>
