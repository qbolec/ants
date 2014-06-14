<?php
class EchoHandler extends Handler{
  
  public function handle(IRequestEnv $env){
    $output = array(
      'get' => $_GET,
      'post' => $_POST,
      'server' => $_SERVER,
      'body' => Framework::get_instance()->get_request_factory()->from_globals()->get_body(),
    );
    return Framework::get_instance()->get_response_factory()->json_from_data($output);
  }
}
?>
