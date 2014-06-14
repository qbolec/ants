<?php
class UsersFieldsHandler extends JSONHandler implements IGetJSONHandler
{
  public function get_get_validator(IApplicationEnv $env){
    return new NullValidator();
  }
  public function get_get_data(IApplicationEnv $env){
    return array_keys(Users::get_instance()->get_settable_fields());
  }

}
