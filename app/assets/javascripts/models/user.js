Welp.Models.User = Backbone.Model.extend({
  urlRoot: "api/users/",

  parse: function(json) {
    if (json.reviews) {
      this.reviews().set(json.reviews, { parse: true });
      delete json.reviews;
    }

    return json;
  },

  reviews: function() {
    if (!this._reviews) {
      this._reviews = new Welp.Collections.Reviews([], {
        user: this
      });
    }
    return this._reviews;
  }
})
