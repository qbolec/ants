///<reference path="../jst/event.ts" />
///<reference path="./controls_collection.ts" />

class EventModel extends Backbone.Model{
  defaults(){
    return {
      kind:'info',
      msg:'Unknown situation',
      ttl:null,
    }
  }
}
class EventControl extends Control{
  view:EventView;
  initialize(){
    this.view = new EventView({model:this});
    this.view.render();
    this.listenToOnce(this.view,'remove',()=>this.trigger('remove'));
    this.listenToOnce(this.view,'removed',()=>this.trigger('removed'));
    var ttl = this.get('event').get('ttl');
    if(ttl!==null){
      _.delay(()=>this.trigger('remove'),ttl);
    }
  }
  close(){
    this.view.close();
  }
}
class EventView extends Backbone.View{
  events(){
    return {
      'click .close' : () => this.trigger('remove'),
    }
  }
  close(){
    this.$el.removeClass('fadeInUp');
    this.$el.addClass('animated fadeOutUp');
    _.delay(()=>this.trigger('removed'),1000);
  }
  render(){
    this.$el.html(Templates.get('event')(this.model.get('event').toJSON()));
    return this;
  }
}

class EventsCollection extends Backbone.Collection{
  model: EventModel;
}
class EventsView extends Backbone.View{
  model:Events;
  initialize(){
    this.listenTo(this.model.controls,'add',this.addEvent);
    this.listenTo(this.model.controls,'remove',(control)=>control.close());
  }
  addEvent(control){
    this.$el.append(control.getEl());
    this.listenToOnce(control,'removed',()=>control.getEl().detach());
  }
  render(){
    this.$el.empty();
    _.each(this.model.controls.getImages(),(control)=>this.addEvent(control));
    return this;
  }
}
class Events extends Control{
  view : EventsView;
  models:EventsCollection;
  controls:ControlsCollection;
  defaults(){
    return {
      displayed_count:0,
      seen_count:0,
      unseen_count:0,
    }
  }
  initialize(){
    this.models = new EventsCollection();
    this.controls = new ControlsCollection(this.models,(event)=>{
      var control = new EventControl({event:event});
      this.listenToOnce(control,'remove',()=>{
        this.models.remove(event);
        this.set('unseen_count',this.get('unseen_count')+1);
      });
      return control;
    });
    this.view = new EventsView({model:this});
    this.view.render();
    setInterval(()=>{
      if(app.get('me')){
        app.api.getEvents({
          success:(events)=>{
            if(events.length >this.get('displayed_count')){
              var new_count=events.length - this.get('displayed_count');
              for(var i=new_count;i--;){
                var event=events[i];
                this.add(new EventModel({msg:event.text,ttl:2000}));
              }
              this.set('displayed_count',events.length);
            }
            //this.set('unseen_count',events.length-this.get('seen_count'));
          },
          error:(xhr)=>{
            console.log(xhr.status,"when fetching events");
          }
        });
      }
    },20000);
  }
  add(event:EventModel){
    this.models.add(event);
  }
  empty(){
    this.models.reset([]);
  }
}
