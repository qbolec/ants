<?php
interface IEmailsInfosRelation extends IRelation, IGetInstance
{
  public function user_email_exists($address);
  public function get_id_by_username($address);
}
?>
