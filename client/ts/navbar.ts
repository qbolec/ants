///<reference path="../jst/navbar.ts" />
class NavbarView extends Backbone.View {
  model:Navbar;
  events(){
    return {
      'click .login' : (e) => {app.showLogin();},
      'click .logout' : (e) => {e.preventDefault();app.logout();},
      'click a[href=#quiz]' : (e) => {this.trigger('quizSelected');},
    }
  }
  initialize(){
    this.listenTo(this.model.get('app').router,'route',(site)=>{
      this.$('ul.navbar-nav li').removeClass('active');
      this.$('ul.navbar-nav li.on_site-' + site).addClass('active');
    });
    this.listenTo(this.model,'change:me',(model,me)=>{
      if(me && !me.get('is_temporary')){
        this.$('.username').text(Texts.get('navbar/authentication_status/regular',me));
      }
    });
  }
  render(){
    this.$el.html(Templates.get('navbar')(this.model.get('app').toJSON()));
    return this;
  }
}
class Navbar extends Control {
  view: NavbarView;
  defaults(){
    return {
      app : null,
      me : null,
    }
  }
  initialize(){
    this.view = new NavbarView({model:this});
    this.view.render();
    this.listenTo(this.get('app'),'change:me',(app,me)=>this.set('me',me));
    this.listenTo(this.view,'quizSelected',()=>this.trigger('quizSelected'));
  }
}
