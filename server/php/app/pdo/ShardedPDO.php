<?php
class ShardedPDO extends MultiInstance implements IShardedPDO
{
  const PDO_NAME = 'sharded';
  const SHARDING_NAME = 'sharded';
  public function get_shards_count(){
    return 16;
  }
  public function get_shard_id($user_id){
    $pdo_factory = Framework::get_instance()->get_pdo_factory();
    $shards_count = $pdo_factory->get_shards_count(self::PDO_NAME);
    $sharding = Framework::get_instance()->get_sharding_factory()->from_config_name(self::SHARDING_NAME);
    return $sharding->get_shard_id_from_entity_id($shards_count,$user_id);
  }
  public function get_pdo_by_shard_id($shard_id){
    $pdo_factory = Framework::get_instance()->get_pdo_factory();
    return $pdo_factory->get_pdo(self::PDO_NAME,$shard_id);
  }
}
?>
