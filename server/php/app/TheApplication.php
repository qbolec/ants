<?php
class TheApplication extends AbstractApplication implements ITheApplication
{
  public function get_sharded_pdo(){
    return ShardedPDO::get_instance();
  }
  protected function get_root_router(){
    return new RootRouter();
  }
  protected function get_initial_env(IRequest $request){
    return new TheApplicationEnv($request);
  }
  public function get_time(){
    return $this->get_framework()->get_time();
  }
  private function get_framework(){
    return Framework::get_instance();
  }
}
?>
