class ViewsCollection implements Backbone.Events{
        on:(eventName: any, callback?: (...args: any[]) => void , context?: any)=> any;
        off:(eventName?: string, callback?: (...args: any[]) => void , context?: any)=> any;
        trigger:(eventName: string, ...args: any[])=> any;
        bind:(eventName: string, callback: (...args: any[]) => void , context?: any)=> any;
        unbind:(eventName?: string, callback?: (...args: any[]) => void , context?: any)=> any;

        once:(events: string, callback: (...args: any[]) => void , context?: any)=> any;
        listenTo:(object: any, events: string, callback: (...args: any[]) => void )=> any;
        listenToOnce:(object: any, events: string, callback: (...args: any[]) => void )=> any;
        stopListening:(object?: any, events?: string, callback?: (...args: any[]) => void )=> any;

  viewByCid = {};
  constructor(public collection:Backbone.Collection,public viewClass){
    collection.each((model)=>{
      this.viewByCid[model.cid] = this.createView(model);
    });

    this.listenTo(collection,'reset',()=>{
      this.viewByCid = {};
      _.each(this.viewByCid,(view)=>{this.trigger('remove',view);});
      collection.each((model)=>{
        this.viewByCid[model.cid] = this.createView(model);
      });
      _.each(this.viewByCid,(view)=>{this.trigger('add',view);});
    });

    this.listenTo(collection,'add',(model)=>{
      var view = this.createView(model);
      this.viewByCid[model.cid] = view;
      this.trigger('add',view);
    });

    this.listenTo(collection,'remove',(model)=>{
      var view = this.viewByCid[model.cid];
      delete this.viewByCid[model.cid];
      this.trigger('remove',view)
    });

  }
  getView(model){
    return this.viewByCid[model.cid];
  }
  createView(model){
    return new this.viewClass({model:model});
  }

}
_.extend(ViewsCollection.prototype,Backbone.Events);
