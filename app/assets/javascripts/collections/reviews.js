Welp.Collections.Reviews = Backbone.Collection.extend({
  url: "/api/reviews",
  model: Welp.Models.Review,

  initialize: function(opts) {
    this.restaurant = opts.restaurant
  }
});
