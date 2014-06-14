<?php
class Sha1Validator extends PCREValidator
{
  public function __construct(){
    parent::__construct('/^[[:xdigit:]]{40}$/i');
  }
}
?>
