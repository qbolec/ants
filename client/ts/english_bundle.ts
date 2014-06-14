///<reference path="bundle.ts" />
///<reference path="./underscore/underscore.d.ts" />
class EnglishBundle extends Bundle {
  mapping = {
    //confirm_email:
    'confirm_email/401':
      "The link you've clicked is probably malformed: the link contains a token which is not a valid proof for this email address.",
    'confirm_email/403': 
      "This user account has already confirmed email address. You can login now.",
    'confirm_email/404':
      "The link you've clicked is probably malformed: there is no such user account",
    'confirm_email/409':
      "The link you've clicked is probably malformed: this user account is tied to a different email address",
    'confirm_email/default':
      "Unknown error occured on server side. We are deeply sorry. Try again later.",
    'confirm_email/success':
      "Hurray, you have successfully confirmed email address for your account! Now you can login.",

    //end
    '':''
  }
}
