Welp.Models.Restaurant = Backbone.Model.extend({
  urlRoot: "api/restaurants",

  parse: function(json) {
    if (json.reviews) {
      this.reviews().set(json.reviews, { parse: true });
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
  },

  toJSON: function(){
    // We want proper namespacing of our attributes in Rails.
    var json = {restaurant: _.clone(this.attributes)};

    if (this._image) {
      json.restaurant.pic = this._image;
    }

    return json;
  }

});
