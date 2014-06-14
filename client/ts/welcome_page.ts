///<reference path="../jst/welcome_page.ts" />
///<reference path="./page.ts" />
class WelcomePageView extends Backbone.View{
  className(){return "welcome_page"}
  events(){
    return {
      'click .login' : () => {app.showLogin()},
      'click .tour' : () => {app.showTour()},
    }
  }
  render(){
    this.$el.html(Templates.get('welcome_page')({
    }));
    return this;
  }
}
class WelcomePage extends Page {
  view:WelcomePageView;
  initialize(){
    this.view = new WelcomePageView({model:this});
    this.view.render();
  }
}
