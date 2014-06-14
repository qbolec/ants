///<reference path="../jst/rules_page.ts" />
///<reference path="./page.ts" />
class RulesPageView extends Backbone.View{
  model:RulesPage;
  className(){
    return "rules_page";
  }
  render(){
    this.$el.html(Templates.get('rules_page')(this.model.toJSON()));
    return this;
  }
}
class RulesPage extends Page {
  view:RulesPageView;
  initialize(){
    this.view = new RulesPageView({model:this});
    this.view.render();
  }
}
