<?php
class EmailConfirmationValidator extends RecordValidator
{
  public function __construct(){
    parent::__construct(array(
      'address' => new EmailValidator(),
      'token' => new StringValidator(),
    ));
  }
}
?>
