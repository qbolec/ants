<?php
abstract class ParamlessJSONGetHandler extends JSONHandler implements IGetJSONHandler
{
  public function get_get_validator(IApplicationEnv $env){
    return new AnythingValidator();
  }
}
?>
