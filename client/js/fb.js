(function(app){
  function onConnect(){
    FB.api('/me', function(response) {
      app.onFBLogin(response);
    });
  }
  function login() {
    FB.login(function(response) {
      if (response.authResponse) {
        onConnect();
      }
    });
  }
  function logout(){
    FB.logout();
    app.onFBLogout();
  }
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '114637268631325', // App ID
      channelUrl : '//static/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    // Additional init code here
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        onConnect();
      } else {
      }
    });

  };
  $(document.body).addEvent('click:relay(.fbLogin)',login);
  $('fbLogout').addEvent('click',logout);
})(app);

// Load the SDK Asynchronously
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));
