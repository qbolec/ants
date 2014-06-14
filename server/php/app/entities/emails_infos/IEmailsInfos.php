<?php
interface IEmailsInfos extends IEntities
{
  /**
   * @return IEmailInfo
   */
  public function create(array $data);
  public function create_user_email($address);
  public function create_shop_email(IShop $shop,$address);
  public function confirm_shop_email(IShop $shop,IEmailInfo $email_info);
}
?>
