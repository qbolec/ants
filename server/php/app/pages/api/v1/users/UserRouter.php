<?php
class UserRouter extends Router
{
  protected $routing_table = array(
    '' => 'UserHandler',
    'emails' => 'UserEmailsRouter',
  );
}
