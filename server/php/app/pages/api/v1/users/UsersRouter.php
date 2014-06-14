<?php
class UsersRouter extends Router
{
  protected $routing_table = array(
    '' => 'UsersHandler',
    'me' => 'UsersMeHandler',
    'passwords' => 'UsersPasswordsRouter',
    'source' => 'UsersSourceRouter',
    'ast' => 'UsersASTHandler',
    'is_open_source' => 'UserIsOpenSourceHandler',
    'nick' => 'UsersNickHandler',
  );
  public function resolve_part($part,IRequestEnv $env){
    try{
      $id = Convert::to_int($part);
    }catch(CouldNotConvertException $e){
      return parent::resolve_part($part,$env);
    }
    try{
      $user = Users::get_instance()->get_by_id($id);
    }catch(IsMissingException $e){
      throw new HTTPNotFoundException($env);
    }
    $env->set(ITheApplicationEnv::USER,$user);
    return new PartialResolution(new UserRouter(),$env);
  }
}
