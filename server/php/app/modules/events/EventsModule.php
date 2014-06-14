<?php
class EventsModule extends MultiInstance implements IEventsModule
{
  public function on_match_bet($match_id, $user_id, $changed){
    Framework::get_instance()->get_logger()->log(func_get_args());
  }
  public function on_admin(IRequestEnv $env){
    Framework::get_instance()->get_logger()->log();
  } 
}
?>
