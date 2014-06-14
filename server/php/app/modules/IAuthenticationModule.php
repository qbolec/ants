<?php
interface IAuthenticationModule
{
  public function is_authenticated(IRequestEnv $env);
  public function is_anonymous(IRequestEnv $env);
  /**
   * @throws HTTPUnauthorizedException
   */
  public function get_visitor(IRequestEnv $env);
  /**
   * @param ttl int or null. If null then value from Config is used
   */
  public function generate_token(IUser $visitor, $ttl = null);
}
?>
