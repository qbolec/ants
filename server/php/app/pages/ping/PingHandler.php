<?php
class PingHandler extends JSONHandler implements IGetJSONHandler
{
  public function get_get_validator(IApplicationEnv $env){
    return new NullValidator();
  }
  public function get_get_data(IApplicationEnv $env){
    Framework::get_instance()->get_logger()->log();
    return 'pong';
  }
}
?>
