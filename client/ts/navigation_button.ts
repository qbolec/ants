///<reference path="../jst/navigation_button.ts" />
class NavigationButtonView extends Backbone.View{
  model:NavigationButton;
  tagName(){return 'button';}
  className(){return 'btn btn-default btn-lg';}
  events(){
    return {
      'click' : () => this.trigger('clicked')
    };
  }
  render(){
    var icon = this.model.get('icon');
    this.$el.html(Templates.get('navigation_button')({icon:icon}));
    return this;
  }
}
class NavigationButton extends Control {
  view: NavigationButtonView;
  initialize(){
    this.view = new NavigationButtonView({model:this});
    this.view.render();
    this.listenTo(this.view,'clicked',()=>this.trigger('clicked'));
  }
}
