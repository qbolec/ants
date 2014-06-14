///<reference path="api.ts" />
class MatMatAPI extends API{

  public changePassword(data,ops){
    this.send('/users/passwords/change',{credentials:{username:data.email,password:data.password},token:data.token},ops,'POST');
  }
  public confirmEmail(data,ops){
    this.send('/users/' + data.id + '/emails/confirm', { token: data.token, address: data.email }, ops, 'POST');
  }
  public requestPasswordChange(email,ops){
    this.send('/users/passwords/requestChange',email,ops,'POST');
  }
  public login(data,ops){
    this.send('/login',{username:data.email,password:data.password},ops,'POST');
  }
  public createAccount(data,ops){
    this.send('/users',{credentials:{username:data.email,password:data.password}},ops,'POST');
  }
  public createTemporaryAccount(ops){
    this.send('/users/temporary',null,ops,'POST');
  }
  public saveNick(nick,ops){
    this.send('/users/nick',nick,ops,'PUT');
  }
  public saveAst(ast,ops){
    this.send('/users/ast',ast,ops,'PUT');
  }
  public saveSource(source,ops){
    this.send('/users/source',source,ops,'PUT');
  }
  public saveIsOpenSource(is_open_source,ops){
    this.send('/users/is_open_source',is_open_source,ops,'PUT');    
  }
  public getMaps(ops){
    this.send('/maps',null,ops,'GET');
  }
  public getPlayers(ops){
    this.send('/players',null,ops,'GET');
  }
  private isAnonymous(){
    return this.credentials===null;
  }
  public reportClick(clickInfo){
  }
}
