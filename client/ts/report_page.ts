///<reference path="../jst/report_page.ts" />
///<reference path="./page.ts" />
class ReportPageView extends Backbone.View{
  model:ReportPage;
  className(){
    return "report_page";
  }
  events(){
    return {
    };
  }
  initialize(){
    this.listenTo(this.model,'change:players',this.render);
  }
  render(){
    this.$el.html(Templates.get('report_page')(this.model.toJSON()));
    return this;
  }
}
class ReportPage extends Page {
  view:ReportPageView;
  defaults(){
    return {
      players:[],
    }
  }
  initialize(){
    this.view = new ReportPageView({model:this});
    this.view.render();
    app.api.getPlayers({
      success:(data)=>{
        this.set('players',data);
      }
    });
  }
}
