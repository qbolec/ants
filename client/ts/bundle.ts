class Bundle {
  mapping = {
  }
  get (id: string, ...params:any[]) : string {
    var text = this.mapping[id];
    if(typeof text == "function"){
      return text.apply(this,params);
    }else if(typeof text == "undefined"){
      console.log("Missing text : " + id);
    }
    return text;
  }
}
