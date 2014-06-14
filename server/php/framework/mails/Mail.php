<?php
class Mail implements IMail{
  private $to;
  private $subject;
  private $message;
  private $headers;
  public function __construct(array $to,$subject,$message,array $headers){
    $this->to = $to;
    $this->subject = $subject;
    $this->message = $message;
    $this->headers = $headers;
  }
  public function send(){
    $prev_language=mb_language();
    mb_language('uni');
    $prev_internal_encoding=mb_internal_encoding();
    mb_internal_encoding("UTF-8");
    $to = implode(',',$this->to);
    $headers = empty($this->headers) ? null : (implode("\r\n",$this->headers)."\r\n");
    mb_send_mail($to,$this->subject,$this->message,$headers);
    mb_internal_encoding($prev_internal_encoding);
    mb_language($prev_language);
  } 
}
?>
