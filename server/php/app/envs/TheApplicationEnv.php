<?php
class TheApplicationEnv extends ApplicationEnv implements ITheApplicationEnv
{
  protected function get_types(){
    return Arrays::merge(parent::get_types(),array(
      self::USER => 'IUser',
      self::FIELD => 'string',
      self::ROLE => 'IRole',
      self::TASK_TEMPLATE => 'ITaskTemplate',
      self::TASK_TEMPLATE_TAG => 'ITaskTemplateTag',
      self::SKILL => 'ISkill',
      self::QUESTION => 'IQuestion',
      self::MATERIAL => 'IMaterial',
    ));
  }
  public function __construct(IRequest $request){
    parent::__construct($request);
  }
}
?>
