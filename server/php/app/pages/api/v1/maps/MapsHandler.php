<?php
class MapsHandler extends JSONHandler implements IGetJSONHandler
{
  public function get_get_validator(IApplicationEnv $env){
    return new AnythingValidator();
  }
  public function get_get_data(IApplicationEnv $env){
    return MapsRelation::get_instance()->get_all();
  }

}
