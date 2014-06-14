<?php
class Role extends AbstractEntity implements IRole
{
  public function get_family(){
    return Roles::get_instance();
  }
  
  public function get_name(){
    return $this->get_field('name');
  }

  public function get_description(){
    return $this->get_field('description');
  }

}
?>
