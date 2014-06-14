Request.JSON.prototype.success = function(text){
  var secure = this.options.secure;
  try{
    var json = this.response.json = JSON.decode(text, secure);
    this.onSuccess(json, text);
  }catch(e){
    json=this.response.json = null;
    this.onFailure();
  }
}
var MootoolsElement = Element;
