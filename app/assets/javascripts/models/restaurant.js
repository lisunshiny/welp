Welp.Models.Restaurant = Backbone.Model.extend({
  urlRoot: "api/restaurants",

  parse: function(json) {
    debugger;
    if (json.reviews) {
      this.reviews().set(json.reviews, { parse: true });
      debugger;
      delete json.reviews;
    }

    return json;
  },

  reviews: function() {
    if (!this._reviews) {
      this._reviews = new Welp.Collections.Reviews({
        restaurant: this
      });
    }
    return this._reviews;
  }

});
