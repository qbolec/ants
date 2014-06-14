<?php
require "autoload.php";
$user_id = Convert::to_int(Arrays::grab($_SERVER['argv'],1));
$authentication_module = new AuthenticationModule();
$users_module = new UsersModule();
$user = $users_module->get_user_by_id($user_id);
echo '?authentication='. $authentication_module->generate_token($user) . "\n";

?>
