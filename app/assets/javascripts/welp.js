window.Welp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    new Welp.Routers.Router({
      $rootEl: $(".main"),
      $header: $(".header"),
      $footer: $(".footer")
    });
    Backbone.history.start();
    console.log("yer in backbone")
    // stuff goes here
  }
};
