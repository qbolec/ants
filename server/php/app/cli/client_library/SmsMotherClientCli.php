<?php
class SmsMotherClientCli extends CliScript
{
  protected function get_args_validator(){
    return new AndValidator(array(
      new ArrayValidator(new StringValidator()),
      new ArrayLengthValidator(new IntBetweenValidator(2)),
    ));
  }
  public function run(){
    $token = $this->options[0];
    $foo = $this->options[1];
    $args = array_slice($this->options,2);
    $params = array_map(array('JSON','decode'),$args);
    $client = new SmsMotherClient(array('authentication_token'=>$token));
    try{
      $response = call_user_func_array(array($client,$foo),$params);
      try{
        var_export(JSON::decode($response));
      }catch(Exception $_){
        echo $response;
      }
    }catch(HTTPException $e){
      echo $e->getCode() . ' - ';
      try{
        var_export(JSON::decode($e->getMessage()));
      }catch(Exception $_){
        echo $e->getMessage();
      }
    }
    echo "\n";
  }
}
