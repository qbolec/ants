<?php
class EmailInfoTypes extends AbstractNamedEntities implements IEmailInfoTypes
{
  protected function get_id_to_name(){
    return array(
      self::USER => 'USER',
      self::SHOP_NOTIFICATIONS => 'SHOP_NOTIFICATIONS',
    );
  }
  protected function from_data(array $data){
    return new EmailInfoType($data);
  }
}
?>
