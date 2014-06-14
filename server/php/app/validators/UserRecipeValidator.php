<?php
class UserRecipeValidator extends RecordValidator
{
  public function __construct(){
    parent::__construct(array(
      'credentials' => new CredentialsValidator(),
    ));
  }
}
?>
