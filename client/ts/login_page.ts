///<reference path="../jst/login_page.ts" />
///<reference path="./page.ts" />
class LoginPageView extends Backbone.View{
  email_input : JQuery;
  password_input : JQuery;
  form : JQuery;
  model: LoginPage;
  className(){return "login_page"}
  events(){
    return {
      'keypress input.email , input.password' : 'checkForEnter',
      'click .login' : 'login',
      'click .create_account' : 'createAccount',
      'click .recover' : 'recover',
    };
  }
  checkForEnter(e){
    if(e.which == 13){
      this.login();
    }
  }

  updateModel(){
    this.model.set({
      email: this.email_input.val(),
      password: this.password_input.val(),
    });
  }

  recover(){
    this.updateModel();
    this.model.recover();
  }

  login(){
    this.updateModel();
    this.model.login();
  }

  createAccount(){
    this.updateModel();
    this.model.createAccount();
  }
  render(){
    this.$el.html(Templates.get('login_page')({
    }));
    this.email_input = this.$('input[name=email]');
    this.password_input = this.$('input[name=password]');
    this.form = this.$('form');
    return this;
  }
}
class LoginPage extends Page {
  view:LoginPageView;
  defaults(){
    return {
      'email': '',
      'password':'',
    };
  }
  initialize(){
    this.view = new LoginPageView({model:this});
    this.view.render();
  }
  recover(){
    app.api.requestPasswordChange(this.get('email'),{
      success:(data)=>{
        console.log(data);
        app.alerts.add(new Alert({kind:'success',msg:Texts.get('recover/response/200'),ttl:5000}));
      },
      error:(xhr)=>{
        var status_to_alert = {
          400:{kind:'danger',msg:Texts.get('recover/response/400'),ttl:60000},
          404:{kind:'warning',msg:Texts.get('recover/response/404'),ttl:15000},
        };
        var alert = status_to_alert[+ xhr.status] || {kind:'danger',msg:Texts.get('recover/response/other',xhr.status ),ttl:60000};
        app.alerts.add(new Alert(_.extend(alert,{})));
      }
    });
  }
  login(){
    app.api.login(_.clone(this.attributes),{
      success:(data)=>{
        console.log(data);
        app.alerts.add(new Alert({kind:'success',msg:Texts.get('login/response/200'),ttl:2000}));
        app.setCredentialsAfterLogin(data);
        if(/^#?login$/.test(window.location.hash)){
          app.router.navigate('', {trigger: true});
        }
      },
      error:(xhr)=>{
        var status_to_alert = {
          400:{kind:'warning',msg:Texts.get('login/response/400'),ttl:5000},
          401:{kind:'warning',msg:Texts.get('login/response/401'),ttl:5000},
          403:{kind:'danger',msg:Texts.get('login/response/403'),ttl:60000},
          404:{kind:'warning',msg:Texts.get('login/response/404'),ttl:5000},
        };
        var alert = status_to_alert[+ xhr.status] || {kind:'danger',msg:Texts.get('login/response/other',xhr.status ),ttl:60000};
        app.alerts.add(new Alert(_.extend(alert,{})));
      }
    });
  }

  createAccount(){

    app.api.createAccount(_.clone(this.attributes),{
      success:(data)=>{
        console.log(data);
        app.alerts.add(new Alert({kind:'success',msg:Texts.get('create_account/response/200'),ttl:100000}));
        app.removeCredentials();
      },
      error:(xhr)=>{
        var status_to_alert = {
          400:{kind:'danger',msg:Texts.get('create_account/response/400'),ttl:60000},
          403:{kind:'danger',msg:Texts.get('create_account/response/403'),ttl:60000},
          409:{kind:'warning',msg:Texts.get('create_account/response/409'),ttl:15000},
        };
        var alert = status_to_alert[+ xhr.status] || {kind:'danger',msg:Texts.get('create_account/response/other',xhr.status ),ttl:60000};
        app.alerts.add(new Alert(_.extend(alert,{})));
      }
    });
  }
}
