/// <reference path="../ts/templates.ts" />

Templates.templates["email_confirmation_result"] = function(d){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="'+
((__t=( {error:'text-danger',warning:'text-warning',success:'text-success'}[d.severity] ))==null?'':_.escape(__t))+
'">'+
((__t=( d.message ))==null?'':_.escape(__t))+
'</div>\n';
return __p;
}
