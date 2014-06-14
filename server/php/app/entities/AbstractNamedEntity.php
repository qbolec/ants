<?php
abstract class AbstractNamedEntity extends AbstractEntity implements INamedEntity
{
  public function get_name(){
    return $this->get_field('name');
  }
}
?>
