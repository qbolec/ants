<?php
interface IUsersModule extends IGetInstance
{
  public function on_password_change_request(IUser $user);
  public function get_user_by_id($id);
  public function get_user_by_username($username);
  public function create(array $user_recipe);
  public function get_public_searchable_fields();
  public function get_all_searchable_fields();
  /**
   * @throws UnauthorizedException
   */
  public function select_ids(ISelectQuery $select_query,IUser $visitor);
  /**
   * @throws UnauthorizedException
   */
  public function select_count(IPredicate $predicate,IUser $visitor);
}
?>
