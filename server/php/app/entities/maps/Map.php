<?php
class Map extends AbstractEntity implements IMap
{
  public function get_family(){
    return Maps::get_instance();
  }
  
  public function get_name(){
    return $this->get_field('name');
  }

  public function get_terrain(){
    return $this->get_field('terrain');
  }

}
?>
