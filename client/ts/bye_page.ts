///<reference path="../jst/bye_page.ts" />
///<reference path="./page.ts" />
class ByePageView extends Backbone.View{
  className(){return "bye_page"}
  render(){
    var last_login_timestamp = app.get('last_login_timestamp');

    this.$el.html(Templates.get('bye_page')({
      duration : last_login_timestamp? +Date.now()-last_login_timestamp : null,
    }));
    return this;
  }
}
class ByePage extends Page {
  view:ByePageView;
  initialize(){
    this.view = new ByePageView({model:this});
    this.view.render();
  }
}
