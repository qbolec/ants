///<reference path="./control.ts" />
class FilterControlView extends Backbone.View{
  model:FilterControl;
  tagName(){return 'input'}
  className(){return 'filter_control form-control'}
  attributes(){
    return {
      type:'search',
      placeholder:Texts.get('templates_list_page/filter_control/placeholder'),
    }
  }
  events(){
    return {
      'input' : _.throttle((e)=>{
        this.trigger('filterChanged',this.el.value);
      },100)
    };
  }
  initialize(){
  }
  render(){
    return this;
  }
}
class FilterControl extends Control {
  defaults(){
    return {
      filter:null,
    }
  }
  view: FilterControlView;
  initialize(){
    this.view = new FilterControlView({model:this});
    this.view.render();
    this.listenTo(this.view,'filterChanged',(filter)=>{
      if(filter==""){
        this.set('filter',null);
      }else{
        function quote(str){
          return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        };
        var words = filter.split(' ');
        var regexp = '^(?=[^]*' +  _.map(words,quote).join(')(?=[^]*' ) + ')';
        this.set('filter', new RegExp(regexp,'i'));
      }
    });
  }
}
