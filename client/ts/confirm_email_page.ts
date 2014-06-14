///<reference path="../jst/confirm_email_page.ts" />
///<reference path="./page.ts" />
class ConfirmEmailPageView extends Backbone.View{
  model: ConfirmEmailPage;
  className(){return "confirm_email_page"}
  events(){
    return {
      'click .confirm' : 'confirm',
    };
  }
  confirm(){
    this.trigger('confirm');
  }

  render(){
    this.$el.html(Templates.get('confirm_email_page')(this.model.toJSON()));
    return this;
  }
}
class ConfirmEmailPage extends Page {
  view:ConfirmEmailPageView;
  defaults(){
    return {
    };
  }
  initialize(){
    var params = <any> new URI(new URI(location.href).fragment()).query(true);
    if('address' in params && 'token' in params && 'id' in params){
      this.set('email',params.address);
      this.set('token',params.token);
      this.set('id',params.id);
    }
    this.view = new ConfirmEmailPageView({model:this});
    this.view.render();
    this.listenTo(this.view,'confirm',()=>{
      app.api.confirmEmail(_.clone(this.attributes),{
        success:(data)=>{
          console.log(data);
          app.alerts.add(new Alert({kind:'success',msg:Texts.get('confirm_email/response/200'),ttl:4000}));
          app.router.navigate('login', {trigger: true});
        },
        error:(xhr)=>{
          var status_to_alert = {
            400:{kind:'danger',msg:Texts.get('confirm_email/response/400'),ttl:60000},
            401:{kind:'danger',msg:Texts.get('confirm_email/response/401'),ttl:60000},
            403:{kind:'success',msg:Texts.get('confirm_email/response/403'),ttl:4000},
            404:{kind:'danger',msg:Texts.get('confirm_email/response/404'),ttl:60000},
            409:{kind:'danger',msg:Texts.get('confirm_email/response/409'),ttl:60000},
          };
          var alert = status_to_alert[+ xhr.status] || {kind:'danger',msg:Texts.get('confirm_email/response/other',xhr.status ),ttl:60000};
          app.alerts.add(new Alert(_.extend(alert,{})));
          if(xhr.status == 403){
            app.router.navigate('login', {trigger: true});
          }
        }
      });
    });
  }
}
