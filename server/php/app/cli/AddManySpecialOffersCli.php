<?php
class AddManySpecialOffersCli extends CliScript
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
      "state" : "PRE-ORDER",
      "privilegedThreshold" : 10,
      "pricing" : {
        "1" : {
          "cents" : 2500,
          "currency" : "USD"
        },
        "50" : {
          "cents" : 2499,
          "currency" : "USD"
        },
         "100" : {
         "cents" : 2300,
          "currency" : "USD"
        }
      },
      "productId" : 1
    }';
    $shops_ids=array(1,2);
    $base = JSON::decode($json_base);
    for($i=$count;$i--;){
      try{
        $recipe = $base;
        $recipe['productId'] = 1+rand()%$count;
        if(rand()%2){
          unset($recipe['name']);
        }
        if(rand()%2){
          unset($recipe['privilegedThreshold']);
        }
        if(rand()%2){
          unset($recipe['pricing']);
        }
        $response = $client->SpecialOffers_create($recipe);
        try{
          $decoded = JSON::decode($response);
          var_export($decoded);
          $special_offer_id = $decoded['id'];
        }catch(Exception $_){
          echo $response;
        }
        shuffle($shops_ids);
        foreach(array_slice($shops_ids,0,1+rand()%3) as $shop_id){
          echo "\n adding $special_offer_id $shop_id \n";
          $client->SpecialOffer_shops_add($special_offer_id,$shop_id);
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
