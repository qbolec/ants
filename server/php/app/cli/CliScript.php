<?php
abstract class CliScript implements ICliScript
{
  protected $options;
  protected $prog_name;
  abstract protected function get_args_validator();
  protected function validate_args(array $options){
    $validator = $this->get_args_validator();
    $validator->must_match($options);
  }
  protected function parse_args(array $args){
    $key = null;
    $options = array();
    $this->prog_name = array_shift($args);
    foreach($args as $arg){
      if(strlen($arg)>1 && substr($arg,0,2)=='--'){
        $key = substr($arg,2);
      }else{
        $value = $arg;
        if(null===$key){
          $options[]=$value;
        }else{
          $options[$key]=$value;
          $key = null;
        }
      }
    }
    return $options;
  }
  public function __construct(array $args){
    $options = $this->parse_args($args);
    $this->validate_args($options);
    $this->options = $options;
  }
  private function get_stdin(){
    return STDIN;
  }
  protected function get_line(){
    if($this->eof()){
      throw new EOFException();
    }
    $line = stream_get_line($this->get_stdin(),1000000,"\n");
    if($line === '' && $this->eof()){
      //"oh, crap...this is a PHP bug, that sometimes it reports additional empty line at the end\n";
      throw new EOFException();
    }
    return $line;
  }
  protected function eof(){
    return feof($this->get_stdin());
  }
}
?>
