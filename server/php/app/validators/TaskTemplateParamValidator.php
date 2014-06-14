<?php
class TaskTemplateParamValidator extends RecordValidator
{
  public function __construct(){
    parent::__construct(array(
      'param_idx' => new IntValidator(),
      'min_value' => new IntValidator(),
      'max_value' => new IntValidator(),
    ));
  }
}
?>
