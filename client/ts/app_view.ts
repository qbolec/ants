
class AppView extends Backbone.View {
  model: App;
  content : JQuery;
  events(){
    return {
      'mousemove' : 'activate',
      'click' : 'activate',
    }
  }
  constructor (options?){
    this.el = $('#app');
    super(options);
  }

  initialize(){
    this.listenTo(this.model,'change:authorization_state',(model,state)=>{
      this.updateState(state);
    });
    this.listenTo(this.model,'change:page',(model,page)=>{
      this.content.empty();
      this.content.append(page.view.$el);
    });
    this.listenTo(this.model,'change:active',(model,active)=>{
      this.updateActive(active);
    });
  }
  updateActive(active){
    this.$el.toggleClass('active',active);
    this.$el.toggleClass('inactive',!active);
  }
  updateState(state){
    _.each(['anonymous','tour','regular','temporary'],(s)=>{
      this.$el.toggleClass('authorization_state-' + s,s==state);
    });
  }
  activate(){
    this.trigger('activate');
  }


  render(){
    this.$el.html(Templates.get('app')(this.model.toJSON()));
    this.$('#app-alerts').append(this.model.alerts.view.$el);
    this.$el.prepend(this.model.navbar.view.$el);
    this.content = this.$('#app-content');
    if(this.model.get('page')!=null){
      this.content.append(this.model.get('page').view.$el);
    }
    this.updateState(this.model.get('authorization_state'));
    this.updateActive(this.model.get('active'));
    return this;
  }

}
