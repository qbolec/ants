<?php
class UsersPasswordsRouter extends Router
{
  protected $routing_table = array(
    'requestChange' => 'UsersPasswordsRequestChangeHandler',
    'change' => 'UsersPasswordsChangeHandler',
  );
}
