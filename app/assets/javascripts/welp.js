window.Welp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Welp.Routers.Router({
      $rootEl: $(".main")
    });
    Backbone.history.start();
    // stuff goes here
  }
};

$(document).ready(function(){
  Welp.initialize();
});
