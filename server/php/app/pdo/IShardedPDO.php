<?php
interface IShardedPDO extends IGetInstance
{
  public function get_shard_id($user_id);
  public function get_pdo_by_shard_id($shard_id);
  public function get_shards_count();
}
?>
