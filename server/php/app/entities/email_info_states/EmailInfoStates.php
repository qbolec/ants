<?php
class EmailInfoStates extends AbstractNamedEntities implements IEmailInfoStates
{
  protected function get_id_to_name(){
    return array(
      self::UNCONFIRMED => 'UNCONFIRMED',
      self::CONFIRMED => 'CONFIRMED',
    );
  }
  protected function from_data(array $data){
    return new EmailInfoState($data);
  }
}
?>
