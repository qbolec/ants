<?php
class ColumnOrderingValidator extends RecordValidator
{
  public function __construct(array $fields_names){
    parent::__construct(array(
      'field' => new OneOfFixedValuesValidator($fields_names),
      'direction' => new OptionalValidator(new PCREValidator('@^(ASCENDING|DESCENDING)$@')),
    ));
  }
}
?>
