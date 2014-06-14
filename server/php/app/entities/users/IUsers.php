<?php
interface IUsers extends IEntities
{
  /**
   * @return IUser
   */
  public function create(array $data);
  public function compute_hash($password,$salt);
  
}
?>
