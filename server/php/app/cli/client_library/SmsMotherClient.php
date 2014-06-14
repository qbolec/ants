<?php
class HTTPException extends Exception{
}
class SmsMotherClient{
  private $authentication_token = null;
  public function __construct(array $ops=array()){
    if(array_key_exists('authentication_token',$ops)){
      $this->authentication_token = $ops['authentication_token'];
    }
  }
  private $root_endpoint = 'sale.vanisoft.pl/api/v1';
  private function perform_request($method,$url,$input=null){
    $url = $this->root_endpoint . $url;
    $input_json = json_encode($input);
    $params = array();
    $params['data'] = $input_json;
    $params['authentication'] = $this->authentication_token;
    if($method === 'GET' || $method === 'DELETE'){
      $url .= '?'.http_build_query($params);
    }
    $handle = curl_init($url);
    if($method === 'POST'){
      curl_setopt($handle, CURLOPT_POST, true);
    }
    if($method === 'PUT'){
      curl_setopt($handle, CURLOPT_CUSTOMREQUEST, 'PUT');
      $fields = http_build_query($params);
      curl_setopt($handle, CURLOPT_POSTFIELDS, $fields);
    }
    if($method === 'DELETE'){
      curl_setopt($handle, CURLOPT_CUSTOMREQUEST, 'DELETE');
    }
    if($method === 'POST'){
      curl_setopt($handle, CURLOPT_POSTFIELDS, $params);
    }
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    $response_body= curl_exec($handle);
    $response_code= curl_getinfo($handle, CURLINFO_HTTP_CODE);
    curl_close($handle);
    if($response_code != 200){
      throw new HTTPException($response_body,$response_code); 
    }
    return $response_body;
  }
  public function Ping(){
    return $this->perform_request('GET','/ping');
  }
  public function Users_create(array $userRecipe){
    return $this->perform_request('POST','/users',$userRecipe);
  }
  public function Users_passwords_requestChange($username){
    return $this->perform_request('POST','/users/passwords/requestChange',$username);
  }
  public function Users_passwords_change($passwordChange){
    return $this->perform_request('POST','/users/passwords/change',$passwordChange);
  }
  public function User_emails_confirm($userId,array $emailConfirmation){
    return $this->perform_request('POST',"/users/$userId/emails/confirm",$emailConfirmation);
  }
  public function Users_me(){
    return $this->perform_request('GET',"/users/me");
  }
  public function Users_get($userId){
    return $this->perform_request('GET',"/users/$userId");
  }
  public function User_roles_list($userId){
    return $this->perform_request('GET',"/users/$userId/roles");
  }
  public function User_shops_list($userId,$shopWorkerState){
    return $this->perform_request('GET',"/users/$userId/shops",$shopWorkerState);
  }
  public function Users_getFields(){
    return $this->perform_request('GET','/users/fields');
  }
  public function Login(array $credentials){
    return $this->perform_request('POST','/login',$credentials);
  }
  public function User_setField($userId,$field,$value){
    return $this->perform_request('PUT',"/users/$userId/$field",$value);
  }
  public function Users_selectIds($selectQuery){
    return $this->perform_request('GET','/users/selectIds',$selectQuery);
  }
  public function Users_selectCount($predicate){
    return $this->perform_request('GET','/users/selectCount',$predicate);
  }
  public function Roles_list(){
    return $this->perform_request('GET','/roles');
  }
  public function Roles_get($roleId){
    return $this->perform_request('GET',"/roles/$roleId");
  }
  public function Role_permissions_list($roleId){
    return $this->perform_request('GET',"/roles/$roleId/permissions");
  }
  public function Role_users_list($roleId){
    return $this->perform_request('GET',"/roles/$roleId/users");
  }
  public function Role_users_add($roleId,$userId){
    return $this->perform_request('PUT',"/roles/$roleId/users/$userId");
  }
  public function Role_users_remove($roleId,$userId){
    return $this->perform_request('DELETE',"/roles/$roleId/users/$userId");
  }
  public function Auctions_create(array $recipe){
    return $this->perform_request('POST','/auctions',$recipe);
  }
  public function Auction_state_set($auctionId,$state){
    return $this->perform_request('PUT',"/auctions/$auctionId/state",$state);
  }
  public function Auction_join($auctionId,$token){
    return $this->perform_request('POST',"/auctions/$auctionId/join",$token);
  }
  public function Auctions_list(){
    return $this->perform_request('GET','/auctions');
  }
  public function Auctions_get($auctionId){
    return $this->perform_request('GET',"/auctions/$auctionId");
  }
  public function Auction_items_create($auction_id,array $itemRecipe){
    return $this->perform_request('POST',"/auctions/$auction_id/items",$itemRecipe);
  }
  public function Auction_items_list($auction_id){
    return $this->perform_request('GET',"/auctions/$auction_id/items");
  }
  public function performUpload($url,$sourceFileName){
    $handle = curl_init($url);
    
    curl_setopt($handle, CURLOPT_PUT, true);
    
    //TODO: error checking
    $fileSize = filesize($sourceFileName);
    $file = fopen($sourceFileName,'r');
    curl_setopt($handle, CURLOPT_INFILE, $file);
    curl_setopt($handle, CURLOPT_INFILESIZE, $fileSize);
    
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    $responseBody= curl_exec($handle);
    $responseCode= curl_getinfo($handle, CURLINFO_HTTP_CODE);
    curl_close($handle);
    if($responseCode != 201){
      throw new HTTPException($responseBody,$responseCode); 
    }
    return $responseBody;
  }
  public function Items_images_startUpload($sha1){
    return $this->perform_request('POST','/items/images',$sha1);
  }
  public function Items_images_performUpload($url,$sourceFileName){
    return $this->performUpload($url,$sourceFileName);
  }
  public function Items_images_upload($sourceFileName){
    $sha1 = sha1_file($sourceFileName);
    $url = json_decode( $this->Items_images_startUpload($sha1) );
    return $this->Items_images_performUpload($url,$sourceFileName);
  }
  public function Item_bids_list($item_id){
    return $this->perform_request('GET',"/items/$item_id/bids");
  }
  public function Item_bids_create($item_id,$cents){
    return $this->perform_request('POST',"/items/$item_id/bids",$cents);
  }
  public function Items_get($itemId){
    return $this->perform_request('GET',"/items/$itemId");
  }
  public function Bids_get($id){
    return $this->perform_request('GET',"/bids/$id");
  }
}
?>
