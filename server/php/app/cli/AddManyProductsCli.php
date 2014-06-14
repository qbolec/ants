<?php
class AddManyProductsCli extends CliScript
{
  protected function get_args_validator(){
    return new RecordValidator(array(
      'token' => new StringValidator(),
      'count' => new IntLikeBetweenValidator(0),
    ));
  }
  public function run(){
    $token = $this->options['token'];
    $count = $this->options['count'];
    $client = new SmsMotherClient(array('authentication_token'=>$token));
    $json_base = '{
        "name" : "SC2 HOTS mega pack",
        "thumbnailUrl" : "//example.com/photos/hots/200x200.jpg",
        "depletionAlertThreshold" : 3,
        "description" : "**Cool** game!",
        "defaultOffer" : {
          "privilegedThreshold" : 10,
          "pricing" :{
            "1" : {
              "cents" : 2500,
              "currency" : "USD"
            },
            "50" :{
              "cents" : 2499,
              "currency" : "USD"
            },
            "100" :{
              "cents" : 2300,
              "currency" : "USD"
            }
          }
        }
      }
    ';
    $base = JSON::decode($json_base);
    for($i=$count;$i--;){
      try{
        $recipe = $base;
        $recipe['name'] = 'Random Kindgdom part' . $i . ' of ' . rand();
        $recipe['description'] = 'The episode'.$i.' was way better than previous';
        $recipe['thumbnailUrl'] = '//example.com/photos/' . $i. '/200x200.jpg';
        $recipe['defaultOffer']['privilegedThreshold'] = rand()%10;
        $recipe['defaultOffer']['pricing']['100']['cents'] = 2000 + rand()%100;
        $response = $client->Products_create($recipe);
        try{
          var_export(JSON::decode($response));
        }catch(Exception $_){
          echo $response;
        }
      }catch(HTTPException $e){
        echo $e->getCode() . ' - ';
        try{
          var_export(JSON::decode($e->getMessage()));
        }catch(Exception $_){
          echo $e->getMessage();
        }
      }
      echo "\n";
    }
  }
}
