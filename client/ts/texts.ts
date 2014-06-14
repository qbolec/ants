///<reference path="./underscore/underscore.d.ts" />
///<reference path="bundle.ts" />
///<reference path="polish_bundle.ts" />
///<reference path="english_bundle.ts" />
class Texts {
  private static bundles = {
    'pl': new PolishBundle(),
    'en': new EnglishBundle()
  };
  private static lang: string = 'pl';
  static setLanguage (lang: string) : void {
    this.lang = lang;
  }
  static get(id: string, ...params:any[]) : string {
    var bundle : Bundle = this.bundles[this.lang];
    return bundle.get.apply(bundle, arguments);
  }
}
