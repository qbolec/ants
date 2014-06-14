<?php
class AuthenticationModule extends MultiInstance implements IAuthenticationModule
{
  public function is_authenticated(IRequestEnv $env){
    try{
      $this->get_visitor($env);
      return true;
    }catch(HTTPUnauthorizedException $e){
      return false;
    }
  }
  public function is_anonymous(IRequestEnv $env){
    return !$this->is_authenticated($env);
  }
  public function get_visitor(IRequestEnv $env){
    if($this->has_session_token($env)){
      return $this->get_visitor_from_session_token($env);
    }else{
      throw new HTTPUnauthorizedException($env);
    }
  }
  private function get_users_module(){
    return UsersModule::get_instance();
  }
  private function get_visitor_from_session_token(IRequestEnv $env){
    try{
      $token = $this->get_token($env->get_request());
      $tickets = $this->get_tickets();
      try{
        $id = $tickets->peek_id($token);
      }catch(IsMissingException $e){
        throw new HTTPUnauthorizedException($env);
      }
      if(preg_match('@is_user/(\d+)$@',$id,$match)){
        $user_id = Convert::to_int($match[1]);
        $user = $this->get_users_module()->get_user_by_id($user_id);
        if($id===$tickets->get_id($token,$user->get_password_hash())){
          return $user;
        }else{
          throw new HTTPUnauthorizedException($env);
        }
      }else{
        throw new HTTPUnauthorizedException($env);
      }
    }catch(InvalidTicketException $e){
      throw new HTTPUnauthorizedException($env);
    }
  }
  private function get_token(IRequest $request){
    switch($request->get_method()){
    case IRequest::METHOD_DELETE:
      return $request->get_delete_value('authentication');
    case IRequest::METHOD_GET:
      return $request->get_uri_param('authentication');
    case IRequest::METHOD_POST:
      return $request->get_post_value('authentication');
    case IRequest::METHOD_PUT:
      parse_str($request->get_body(),$fields);
      return Arrays::get($fields,'authentication');
    default:
      return null;
    } 
  }
  private function has_session_token(IRequestEnv $env){
    return null!==$this->get_token($env->get_request());
  }
  private function get_token_ttl(){
    return Config::get_instance()->get('tickets/authentication/ttl');
  }
  private function get_tickets(){
    return Framework::get_instance()->get_tickets();
  }
  public function generate_token(IUser $visitor, $ttl = null){
    if(null === $ttl){
      $ttl = $this->get_token_ttl();
    }
    return $this->get_tickets()->generate("is_user/" . $visitor->get_id(), $ttl, $visitor->get_password_hash());
  }
}
?>
