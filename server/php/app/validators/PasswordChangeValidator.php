<?php
class PasswordChangeValidator extends RecordValidator
{
  public function __construct(){
    parent::__construct(array(
      'credentials' => new CredentialsValidator(),
      'token' => new StringValidator(),
    ));
  }
}
?>
