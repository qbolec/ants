/// <reference path="./underscore/underscore.d.ts" />
class Templates{
  public static templates = {};
  public static get(name) : (any?) => string {
    return Templates.templates[name];
  }
}
