class MappedCollection implements Backbone.Events{
        on:(eventName: any, callback?: (...args: any[]) => void , context?: any)=> any;
        off:(eventName?: string, callback?: (...args: any[]) => void , context?: any)=> any;
        trigger:(eventName: string, ...args: any[])=> any;
        bind:(eventName: string, callback: (...args: any[]) => void , context?: any)=> any;
        unbind:(eventName?: string, callback?: (...args: any[]) => void , context?: any)=> any;

        once:(events: string, callback: (...args: any[]) => void , context?: any)=> any;
        listenTo:(object: any, events: string, callback: (...args: any[]) => void )=> any;
        listenToOnce:(object: any, events: string, callback: (...args: any[]) => void )=> any;
        stopListening:(object?: any, events?: string, callback?: (...args: any[]) => void )=> any;

  imageByCid = {};
  constructor(public collection,public mapper){
    collection.each((model)=>{
      this.imageByCid[model.cid] = this.mapper(model);
    });

    this.listenTo(collection,'reset',()=>{
      _.each(this.imageByCid,(image)=>{this.trigger('remove',image);});
      this.imageByCid = {};
      collection.each((model)=>{
        this.imageByCid[model.cid] = this.mapper(model);
      });
      _.each(this.imageByCid,(image)=>{this.trigger('add',image);});
    });

    this.listenTo(collection,'add',(model)=>{
      var image = this.mapper(model);
      this.imageByCid[model.cid] = image;
      this.trigger('add',image);
    });

    this.listenTo(collection,'remove',(model)=>{
      var image = this.imageByCid[model.cid];
      delete this.imageByCid[model.cid];
      this.trigger('remove',image)
    });

  }
  each(foo){
    return _.each(this.getImages(),foo);
  }
  getImages(){
    return this.imageByCid;
  }
  getImage(model){
    return this.imageByCid[model.cid];
  }
}
_.extend(MappedCollection.prototype,Backbone.Events);
