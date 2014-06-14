///<reference path="../jst/alert.ts" />
///<reference path="./controls_collection.ts" />

class Alert extends Backbone.Model{
  defaults(){
    return {
      kind:'info',
      msg:'Unknown situation',
      ttl:null,
    }
  }
}
class AlertControl extends Control{
  view:AlertView;
  initialize(){
    this.view = new AlertView({model:this});
    this.view.render();
    this.listenToOnce(this.view,'remove',()=>this.trigger('remove'));
    this.listenToOnce(this.view,'removed',()=>this.trigger('removed'));
    var ttl = this.get('alert').get('ttl');
    if(ttl!==null){
      _.delay(()=>this.trigger('remove'),ttl);
    }
  }
  close(){
    this.view.close();
  }
}
class AlertView extends Backbone.View{
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
    this.$el.html(Templates.get('alert')(this.model.get('alert').toJSON()));
    return this;
  }
}

class AlertsCollection extends Backbone.Collection{
  model: Alert;
}
class AlertsView extends Backbone.View{
  model:Alerts;
  initialize(){
    this.listenTo(this.model.controls,'add',this.addAlert);
    this.listenTo(this.model.controls,'remove',(control)=>control.close());
  }
  addAlert(control){
    this.$el.append(control.getEl());
    this.listenToOnce(control,'removed',()=>control.getEl().detach());
  }
  render(){
    this.$el.empty();
    _.each(this.model.controls.getImages(),(control)=>this.addAlert(control));
    return this;
  }
}
class Alerts extends Control{
  view : AlertsView;
  models:AlertsCollection;
  controls:ControlsCollection;
  initialize(){
    this.models = new AlertsCollection();
    this.controls = new ControlsCollection(this.models,(alert)=>{
      var control = new AlertControl({alert:alert});
      this.listenToOnce(control,'remove',()=>{
        this.models.remove(alert);
      });
      return control;
    });
    this.view = new AlertsView({model:this});
    this.view.render();
  }
  add(alert:Alert){
    this.models.add(alert);
  }
  empty(){
    this.models.reset([]);
  }
}
