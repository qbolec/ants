<?php
class BatchJSONOutput  implements IBatchJSONOutput
{
  private $status_code;
  private $status_text;
  private $headers = array();
  private $body; 
  public function send_status($code,$text){
    $this->status_code = $code;
    $this->status_text = $text;
  }
  public function send_header($header_key,$header_value){
    $this->headers[$header_key]=$header_value;
  }
  public function send_body($body){
    $this->body = $body;
  }
  public function get_response_object(){
    return array(
      'status' => $this->status_code,
      'statusText' => $this->status_text,
      'headers' => JSON::force_assoc($this->headers),
      'body' => $this->body,
    );
  }
}
?>
