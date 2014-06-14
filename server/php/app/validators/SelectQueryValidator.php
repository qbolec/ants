<?php
class SelectQueryValidator extends RecordValidator
{
  public function __construct(array $fields_names){
    parent::__construct(array(
      'where' => new OptionalValidator(new PredicateValidator($fields_names)),
      'limit' => new OptionalValidator(new IntBetweenValidator(0)),
      'offset' => new OptionalValidator(new IntBetweenValidator(0)),
      'orderBy' => new OptionalValidator(new ArrayValidator(new ColumnOrderingValidator($fields_names))),
    ));
  }
}
?>
