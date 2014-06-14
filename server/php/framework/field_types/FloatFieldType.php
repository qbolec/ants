<?php
class FloatFieldType implements IFieldType
{
  public function get_normalizer(){
    return new FloatLikeValidator();
  }
  public function get_validator(){
    return new FloatValidator();
  }
  public function get_pdo_param_type($value){
    return PDO::PARAM_FLOAT;
  }
  public function get_sort_type(){
    return SORT_NUMERIC;
  }
}
?>
