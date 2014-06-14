///<reference path="../jst/change_password_page.ts" />
///<reference path="./page.ts" />
class ChangePasswordPageView extends Backbone.View{
  model: ChangePasswordPage;
  email_input : JQuery;
  password_input : JQuery;
  className(){return "change_password_page"}
  events(){
    return {
      'click .confirm' : 'confirm',
    };
  }
  updateModel(){
    this.model.set({
      password: this.password_input.val(),
    });
  }
  confirm(){
    this.updateModel();
    this.trigger('confirm');
  }

  render(){
    this.$el.html(Templates.get('change_password_page')(this.model.toJSON()));
    this.email_input = this.$('input[name=email]');
    this.password_input = this.$('input[name=password]');
    return this;
  }
}
class ChangePasswordPage extends Page {
  view:ChangePasswordPageView;
  defaults(){
    return {
      password : '',
    };
  }
  initialize(){
    var params = <any> new URI(new URI(location.href).fragment()).query(true);
    if('address' in params && 'token' in params && 'id' in params){
      this.set('email',params.address);
      this.set('token',params.token);
      this.set('id',params.id);
    }
    this.view = new ChangePasswordPageView({model:this});
    this.view.render();
    this.listenTo(this.view,'confirm',()=>{
      app.api.changePassword(_.clone(this.attributes),{
        success:(data)=>{
          console.log(data);
          app.alerts.add(new Alert({kind:'success',msg:Texts.get('change_password/response/200'),ttl:4000}));
          app.router.navigate('login', {trigger: true});
        },
        error:(xhr)=>{
          var status_to_alert = {
            400:{kind:'danger',msg:Texts.get('change_password/response/400'),ttl:60000},
            401:{kind:'danger',msg:Texts.get('change_password/response/401'),ttl:60000},
            403:{kind:'success',msg:Texts.get('change_password/response/403'),ttl:4000},
            404:{kind:'danger',msg:Texts.get('change_password/response/404'),ttl:60000},
          };
          var alert = status_to_alert[+ xhr.status] || {kind:'danger',msg:Texts.get('change_password/response/other',xhr.status ),ttl:60000};
          app.alerts.add(new Alert(_.extend(alert,{})));
          if(xhr.status == 403){
            app.router.navigate('login', {trigger: true});
          }
        }
      });
    });
  }
}
