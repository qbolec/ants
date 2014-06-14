<?php
class BatchHandler extends JSONHandler implements IPostJSONHandler
{
  public function get_post_validator(IApplicationEnv $env){
    return new ArrayValidator(
      new RecordValidator(array(
        'url' => new UrlValidator(),
        'method' => new PCREValidator('/^(GET|POST|DELETE|PUT)$/'),
        'data' => new MapValidator(
          new StringValidator(),
          new StringValidator()
        ),
      ))
    ); 
  }
  public function get_post_data(IApplicationEnv $env){
    $queries = $env->grab(IApplicationEnv::DATA)->get_data();
    $request_factory = Framework::get_instance()->get_request_factory();
    $app = TheApplication::get_instance();
    $responses = array();
    foreach($queries as $query){
      $url = $query['url'];
      $method = $query['method'];
      $post_data = $query['data'];
      $request = $request_factory->from_method_url_post_data($method,$url,$post_data);
      $response = $app->get_response($request);
      $output = new BatchJSONOutput();
      $response->send($output);
      $responses[] = $output->get_response_object();
    }
    return $responses;
  }
}
?>
