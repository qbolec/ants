class BackboneEvents implements Backbone.Events{
  public on = (<Backbone.Events><any>Backbone.Events).on;
  public once = (<Backbone.Events><any>Backbone.Events).once;
  public listenTo = (<Backbone.Events><any>Backbone.Events).listenTo;
  public listenToOnce = (<Backbone.Events><any>Backbone.Events).listenToOnce;
  public bind = (<Backbone.Events><any>Backbone.Events).bind;
  public unbind = (<Backbone.Events><any>Backbone.Events).unbind;
  public off = (<Backbone.Events><any>Backbone.Events).off;
  public trigger = (<Backbone.Events><any>Backbone.Events).trigger;
  public stopListening = (<Backbone.Events><any>Backbone.Events).stopListening;
}
