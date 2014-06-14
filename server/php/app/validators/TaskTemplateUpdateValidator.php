<?php
class TaskTemplateUpdateValidator extends RecordValidator
{
  public function __construct(){
    parent::__construct(array(
      'id' => new IntValidator(),
      'editor_id' => new OptionalValidator( new IntValidator()),//to pole jest ignorowane
      'edited_at' => new IntValidator(),
      'skill_id' => new NullableValidator(new IntValidator()),
      'head_revision_id' => new IntValidator(),
      'source' => new StringValidator(),
      'params' => new ArrayValidator(new TaskTemplateParamValidator()),
      'tags' => new ArrayValidator(new TaskTemplateTagValidator()),
    ));
  }
}
?>
