interface Storage {
  setObject(key:string,value:any);
  getObject(key:string):any;
}
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
  try{
    return JSON.parse(this.getItem(key));
  }catch(e){
    this.removeItem(key);
    return null;
  }
}
