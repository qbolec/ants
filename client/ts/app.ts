///<reference path="./mathjax/mathjax.d.ts" />
///<reference path="./backbone/backbone.d.ts" />
///<reference path="./bootstrap/bootstrap.d.ts" />
///<reference path="./raphael/raphael.d.ts" />
///<reference path="./storage.ts" />
///<reference path="./URI/URI.d.ts" />
///<reference path="./ace/ace.d.ts" />
///<reference path="./moment/moment.d.ts" />
///<reference path="./control.ts" />
///<reference path="./mat_mat_api.ts" />
///<reference path="./texts.ts" />
///<reference path="./alerts.ts" />
///<reference path="./app_router.ts" />
///<reference path="../jst/app.ts" />
///<reference path="./login_page.ts" />
///<reference path="./confirm_email_page.ts" />
///<reference path="./change_password_page.ts" />
///<reference path="./report_page.ts" />
///<reference path="./edit_template_page.ts" />
///<reference path="./arena_page.ts" />
///<reference path="./app_view.ts" />
///<reference path="./navbar.ts" />
///<reference path="./click_stream.ts" />
///<reference path="./users.ts" />
///<reference path="./bye_page.ts" />
///<reference path="./rules_page.ts" />
class App extends Control{

  api : MatMatAPI;
  clickStream : ClickStream;
  view: AppView;
  router : AppRouter;
  popups = [];
  navbar : Navbar;
  alerts : Alerts;

  defaults(){
    return {
      page:null,
      active:true,
      credentials:null,
      me:null,
      last_login_timestamp:null,
      authorization_state:'anonymous', //regular, temporary, tour
    }
  }
  debouncedInactiveTrigger : Function;
  activate(){
    this.set('active',true);
    this.debouncedInactiveTrigger();
  }
  deactivate(){
    this.set('active',false);
  }


  initialize(){
    this.api = new MatMatAPI();
    this.clickStream = new ClickStream();
    this.router = new AppRouter();
    this.alerts = new Alerts();
    this.debouncedInactiveTrigger = _.debounce(()=>{this.trigger('inactive')},2000);
    this.navbar = new Navbar({app:this});
    this.listenTo(this.navbar,'quizSelected',()=>this.trigger('quizSelected'));
    this.view = new AppView({model:this});
    this.view.render();
    this.listenTo(this.view,'activate',this.activate);
    this.listenTo(this,'change:credentials',(model,credentials)=>this.onNewCredentials(credentials));
    this.listenTo(this,'change:me',(model,me)=>{
      if(me){
        if(me.get('is_temporary')){
          this.set('authorization_state','temporary');
        }else{
          this.set('authorization_state','regular');
        }
      }else{
        this.set('authorization_state','anonymous');
      }
    });
    this.activate();
    $(()=>{
      var credentials = this.loadCredentials();
      if(credentials){
        this.set('credentials',credentials);
        this.api.setCredentials(credentials);
        var me = new User({});
        var xhr=me.fetch({
          url:'/users/me',
          success:()=>{
            this.set('me',me);
            console.log(me);
            this.startRouting();
          },
          error:()=>{
            this.set('me',null);
            var status_to_alert = {
              401:{kind:'warning',msg:Texts.get('users/me/response/401'),ttl:5000},
            };
            var alert = status_to_alert[+ xhr.status] || {kind:'danger',msg:Texts.get('users/me/response/other',xhr.status ),ttl:60000};
            app.alerts.add(new Alert(_.extend(alert,{})));
            this.removeCredentials();
            this.showLogin();
          }
        });
      }else if(window.location.hash){
        this.startRouting();
      }else{
        this.showLogin();
      }
    });
  }
  onNewCredentials(credentials){
    if(credentials){
      this.set('last_login_timestamp',+Date.now());
    }
  }
  startRouting(){
    try{
      Backbone.history.start();
    }catch(e){
      Backbone.history.loadUrl(null);//refresh/reroute
    }
  }
  setCredentialsAfterLogin(credentials){
    this.set('credentials',credentials);
    this.api.setCredentials(credentials);
    try{
      localStorage.setObject('credentials',credentials);
    }catch(e){
      console.log(e);
    }
    var me = new User({});
    var xhr=me.fetch({
      url:'/users/me',
      success:()=>{
        this.set('me',me);
        console.log(me);
        this.startRouting();
      },
      error:()=>{
        this.set('me',null);
        var status_to_alert = {
        };
        var alert = status_to_alert[+ xhr.status] || {kind:'danger',msg:Texts.get('users/me/response/other',xhr.status ),ttl:60000};
        app.alerts.add(new Alert(_.extend(alert,{})));
        this.startRouting();
      }
    });
  }
  createTemporaryUserAndStartQuiz(){

    app.api.createTemporaryAccount({
      success:(data)=>{
        console.log(data);
        this.setCredentialsAfterLogin(data);
      },
      error:(xhr)=>{
        var status_to_alert = {
        };
        var alert = status_to_alert[+ xhr.status] || {kind:'danger',msg:Texts.get('create_temporary_account/response/other',xhr.status ),ttl:60000};
        app.alerts.add(new Alert(_.extend(alert,{})));
      }
    });
  }
  removeCredentials(){
    this.set('authorization_state','anonymous');
    this.set('credentials',null);
    this.api.setCredentials(null);
    try{
      localStorage.removeItem('credentials');
    }catch(e){
      console.log(e);
    }
    this.set('me',null);
  }
  loadCredentials(){
    try{
      var credentials = localStorage.getObject('credentials');
      if(credentials===null){
        this.removeCredentials();
        return null;
      }
      return credentials;
    }catch(e){
      console.log(e);
      return null;
    }
  }
  logout(){
    this.removeCredentials();
    this.alerts.add(new Alert({kind:'success',msg:Texts.get('logout/alert'),ttl:3000}));
    this.router.navigate('', {trigger: false});
    this.showBye();
  }
  setPage(page){
    if(this.get('page')){
      this.get('page').quit();
    }
    this.set('page',page);
  }
  showBye(){
    this.setPage(new ByePage());
  }
  showReport(){
    this.set('page',new ReportPage());
  }
  showRules(){
    this.set('page',new RulesPage());
  }
  showArena(){
    this.set('page',new ArenaPage());
  }
  showLogin(){
    switch(this.get('authorization_state')){
      case 'tour':
        this.set('authorization_state','anonymous');
        //falltrough
      case 'anonymous':
      case 'temporary':
        this.setPage(new LoginPage());
        break;
      default:
        console.log("Login requested at state ",this.get('authorization_state'),this);
    }
  }
  showEdit(){
    this.setPage(new EditTemplatePage({me: this.get('me')}));
  }
  showChangePassword(){
    this.setPage(new ChangePasswordPage());
  }
  showConfirmEmail(){
    this.setPage(new ConfirmEmailPage());
  }

}
var app = new App();
