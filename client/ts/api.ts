///<reference path="./underscore/underscore.d.ts" />
///<reference path="./jquery/jquery.d.ts" />
///<reference path="./URI/URI.d.ts" />
class API {
  public credentials = null;
  private queue = [];
  private debouncedSendQueue : Function;
  private sendQueue(){
    var queue = this.queue;
    this.queue = [];
    console.log("batching " + queue.length + " requests");
    $.ajax({
      method:'POST',
      url:'/batch',
      data:{
        data : JSON.stringify(_.map(queue, (ops)=>{
          if(ops.method=='GET'){
            return {url:'http://ants.vanisoft.pl' + ops.url + '?' + URI.buildQuery(ops.data), method:ops.method, data:{}};
          }else{
            return {url:'http://ants.vanisoft.pl' + ops.url, method:ops.method, data:ops.data};
          }
        })),
        authentication : this.credentials ? this.credentials.authenticationToken : null,
      },
      error:(xhr)=>{
        _.each(queue,(ops)=>{
          if(ops.error){
            ops.error(xhr);
          }
        });
      },
      success:(data)=>{
        _.each(data,(response,i)=>{
          var ops = queue[i];
          if(response.status==200){
            if(ops.success){
              ops.success(JSON.parse(response.body));
            }
          }else{
            if(ops.error){
              ops.error(response);
            }
          }
        });
      }
    });
    // safe implementation
    //_.each(queue,(ops)=>{
    //  $.ajax(ops);
    //});

  }
  constructor(){
    this.debouncedSendQueue = _.debounce(()=>{this.sendQueue()},200);
  }
  public enqueue(url,data,ops,method){
    this.queue.push(_.extend({
      method:method,
      url: '/api/v1' + url,
      data:{
        data : JSON.stringify(data),
        authentication : this.credentials ? this.credentials.authenticationToken : null,
      },
      error:(xhr)=>{
        switch(+ xhr.status){
        case 401:
          console.log("You are not authorized to do this.");
          break;
        case 403:
          console.log("This can not be done.");
          break;
        case 404:
          console.log("Could not find the thing.");
          break;
        case 409:
          console.log("Someone else already did this.");
          break;
        default:
          console.log(xhr.status + " We failed :( Refresh page, try again, sorry!!");
        }
      }
    },ops));
    if(this.queue.length == 50){
      this.sendQueue();
    }else{
      this.debouncedSendQueue();
    }
  }
  public send(url,data,ops,method){
    return $.ajax(_.extend({
      method:method,
      url: '/api/v1' + url,
      data:{
        data : JSON.stringify(data),
        authentication : this.credentials ? this.credentials.authenticationToken : null,
      },
      error:(xhr)=>{
        switch(+ xhr.status){
        case 401:
          console.log("You are not authorized to do this.");
          break;
        case 403:
          console.log("This can not be done.");
          break;
        case 404:
          console.log("Could not find the thing.");
          break;
        case 409:
          console.log("Someone else already did this.");
          break;
        default:
          console.log(xhr.status + " We failed :( Refresh page, try again, sorry!!");
        }
      }
    },ops));
  }
  public setCredentials(credentials){
    this.credentials = credentials;
  }
  public getMultiple(ids,getter,ops){
    var todo = ids.length;
    if(!todo && ops.success){
      ops.success([]);
    }
    var id2obj = {};
    _.each(ids,(id)=>{
      getter(id,{
        success:(obj)=>{
          id2obj[id]=obj;
          if(!--todo){
            if(ops.success){
              ops.success(_.map(ids,id=>id2obj[id]));
            }
          }
        },
        error:()=>{
          todo=-1;
          if(ops.error){
            ops.error.apply(this,arguments);
          }
        }
      });
    });
  }
  private getMultipleIndirect(idsGetter,objGetter,ops){
    idsGetter(_.extend({},ops,{
      success:(ids)=>{
        this.getMultiple(ids,objGetter,ops);
      }
    }));
  }

}

///<reference path="./backbone/backbone.d.ts" />

declare module Backbone{
  var ajax : (settings:any) => void;
};

Backbone.ajax = function(settings) {
  if(settings.type==='POST' || settings.type==='PUT'){
    return app.api.send(settings.url,JSON.parse(settings.data),_.omit(settings,['url','contentType','data','type','processData']),settings.type);
  }else{
    return app.api.send(settings.url,settings.data,_.omit(settings,['url','data','type']),settings.type);
  }

};


class APICollection extends Backbone.Collection {
  itemUrl(id){
    return this.url + '/'+ id;
  }
  //@see Backbone.Collection.fetch
  fetch(options?: Backbone.CollectionFetchOptions):JQueryXHR {

    //@see Backbone wrapError
    var wrapError = (options) => {
      var error = options.error;
      options.error = (resp) => {
        if (error) error(this, resp, options);
        this.trigger('error', this, resp, options);
      };
    };

    options = options ? _.clone(options) : {};
    if (options.parse === void 0) options.parse = true;
    var success = options.success;
    var collection = this;
    options.success = (ids?:any) => {
      var options2 = {
        success:(resp) =>{
          var method = options.reset ? 'reset' : 'set';
          collection[method](resp, options);
          if (success) success(collection, resp, options);
          collection.trigger('sync', collection, resp, options);
        }
      };
      wrapError(options2);
      app.api.getMultiple(ids,(id,ops)=>{app.api.enqueue(this.itemUrl(id),null,ops,'GET')},options2);
    };
    wrapError(options);
    return this.sync('read', this, <any>options);
  }
}
