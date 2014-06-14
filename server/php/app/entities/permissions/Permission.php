<?php
class Permission extends AbstractNamedEntity implements IPermission
{
  public function get_family(){
    return Permissions::get_instance();
  }
}
?>
