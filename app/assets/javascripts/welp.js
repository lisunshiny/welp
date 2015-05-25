window.Welp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    window.router = new Welp.Routers.Router({
      $rootEl: $(".main"),
      $header: $(".header"),
      $footer: $(".footer"),
      $modal: $(".modal")
    });
    Backbone.history.start();
    console.log("yer in backbone")
    // stuff goes here
  }
};
