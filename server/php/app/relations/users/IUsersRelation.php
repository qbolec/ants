<?php
interface IUsersRelation extends IRelation, IGetInstance
{
  public function get_id_by_email($email);
}
?>
