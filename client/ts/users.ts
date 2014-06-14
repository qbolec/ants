class User extends Backbone.Model {

  initialize(){
    this.urlRoot = '/users';
  }
}


class UsersCollection extends APICollection {
  model = User;
  url = "/users";
}
