<?php
class TaskTemplateTagValidator extends RecordValidator
{
  public function __construct(){
    parent::__construct(array(
      'id' => new IntValidator(),
      'name' => new StringValidator(),
    ));
  }
}
?>
