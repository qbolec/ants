<?php
interface IMaps extends IEntities
{
  /**
   * @return IMap
   */
  public function create(array $data);
}
?>
