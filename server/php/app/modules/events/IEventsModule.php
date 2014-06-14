<?php
interface IEventsModule extends IGetInstance
{
  public function on_match_bet($match_id, $user_id, $changed);
  public function on_admin(IRequestEnv $env);
}
?>
