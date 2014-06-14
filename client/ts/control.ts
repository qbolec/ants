///<reference path="./backbone/backbone.d.ts" />
class Control extends Backbone.Model{
  view:Backbone.View;
  getEl(){
    return this.view.$el;
  }
}
