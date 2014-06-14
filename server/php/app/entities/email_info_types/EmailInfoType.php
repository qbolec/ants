<?php
class EmailInfoType extends AbstractNamedEntity implements IEmailInfoType
{
  public function get_family(){
    return EmailInfoTypes::get_instance();
  }
}
?>
