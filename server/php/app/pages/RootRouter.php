<?php
class RootRouter extends Router
{
  protected $routing_table = array(
    'api' => 'ApiRouter',
    '' => 'MainHandler',
    'batch' => 'BatchHandler',
  );
}
