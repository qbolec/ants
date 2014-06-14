<?php
class TaskTemplateRecipeValidator extends RecordValidator
{
  public function __construct(){
    parent::__construct(array(
      'source' => new StringValidator(),
      'skill_id' => new NullableValidator(new IntValidator()),
      'params' => new ArrayValidator(new TaskTemplateParamValidator()),
      'tags' => new ArrayValidator(new TaskTemplateTagValidator()),
    ));
  }
}
?>
