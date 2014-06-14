<?php
class EmailValidator extends PCREValidator
{
  public function __construct(){
    parent::__construct('/.@./');
  }
}
?>
