<?php
  /*ten plik stanowi jedyny punkt wejscia do całej aplikacji*/
  //antycypujemy błędy -- a jeśli będzie OK to sobie to zmienimy na 200 OK
  header('HTTP/1.1 500 Internal Server Error');
  //zaczynamy od autoloadera klas, bo bez tego ciężko jechać dalej
  require_once 'autoload.php';
  //no i od tego miejsca możemy już pisać bardziej obiektowo
  TheApplication::get_instance()->run();
?>
