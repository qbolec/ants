<?php
class MainHandler extends Handler{
  public function handle(IRequestEnv $env){
    $template = Framework::get_instance()->get_templates()->get_by_id('Main');
    $body = $template->get_text(array(
    ));
    return Framework::get_instance()->get_response_factory()->from_http_body($body);
  }
}
?>
