class AppRouter extends Backbone.Router{

  routes(){
    return {
      '':'rules',
      'report':'report',
      'login':'login',
      'edit':'edit',
      'arena':'arena',
    };
  }
  initialize(){
    this.route(/^confirm_email\?/,"confirmEmail");
    this.route(/^change_password\?/,"changePassword");
  }
  changePassword(){
    app.showChangePassword();
  }
  confirmEmail(){
    app.showConfirmEmail();
  }
  rules(){
    app.showRules();
  }
  report() {
    app.showReport();
  }
  arena(){
    app.showArena();
  }
  edit(){
    app.showEdit();
  }
  login(){
    app.showLogin();
  }
  goToLogin(){
    this.navigate('login', {trigger: true});
  }
}
