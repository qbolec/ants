<?php
class ApiV1Router extends Router
{
  protected $routing_table = array(
    'ping' => 'PingHandler',
    'echo' => 'EchoHandler',
    'users' => 'UsersRouter',
    'login' => 'LoginHandler',
    'players' => 'PlayersHandler',
    'maps' => 'MapsHandler',
  );
}
