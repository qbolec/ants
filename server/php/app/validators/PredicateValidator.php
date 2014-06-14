<?php
class PredicateValidator extends OrValidator
{
  public function __construct(array $fields_names){
    $field_validator = new FixedIntMapValidator(array(new OneOfFixedValuesValidator($fields_names)));
    $value_validator = new OrValidator(array(
      new BoolValidator(),
      new IntValidator(),
      new StringValidator(),
      $field_validator
    ));
    parent::__construct(array(
      new RecordValidator(array(
        'OR' => new ArrayValidator($this),
      )),
      new RecordValidator(array(
        'AND' => new ArrayValidator($this),
      )),
      new RecordValidator(array(
        'NOT' => new AndValidator(array(
          new ArrayValidator($this),
          new ArrayLengthValidator(new FixedValueValidator(1)),
        )),
      )),
      new RecordValidator(array(
        '<' => new AndValidator(array(
          new ArrayValidator($value_validator),
          new ArrayLengthValidator(new FixedValueValidator(2)),
        )),
      )),
      new RecordValidator(array(
        '>' => new AndValidator(array(
          new ArrayValidator($value_validator),
          new ArrayLengthValidator(new FixedValueValidator(2)),
        )),
      )),
      new RecordValidator(array(
        '<=>' => new AndValidator(array(
          new ArrayValidator($value_validator),
          new ArrayLengthValidator(new FixedValueValidator(2)),
        )),
      )),
      new RecordValidator(array(
        'LIKE' => new FixedIntMapValidator(array(
          $field_validator,
          new StringValidator(),
        )),
      )),
    ));
  }
}
?>
