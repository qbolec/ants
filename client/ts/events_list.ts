///<reference path="../jst/events_list.ts" />
///<reference path="./control.ts" />
class EventsListView extends Backbone.View{
  model:EventsList;
  className(){
    return "events_list";
  }
  events(){
    return {
    }
  }
  initialize(){
    this.listenTo(this.model,'change:events',this.render)
  }
  render(){
    this.$el.html(Templates.get('events_list')({events:this.model.get('events')}));
    return this;
  }
}
class EventsList extends Control {
  defaults(){
    return {
      events:[],
    };
  }
  initialize(){
    this.view = new EventsListView({model:this});
    this.view.render();
    app.api.getEvents({
      success:(events)=>{this.set('events',events);}
    });
  }
}
