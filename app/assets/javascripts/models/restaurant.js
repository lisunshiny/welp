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
      this._reviews = new Welp.Collections.Reviews([], {
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
  },

  setLatlng: function() {
    var request = {
      address: this.escape("address1") + "," + this.escape("address2")
    };

    var geocoder = new google.maps.Geocoder();

    return geocoder.geocode(request, function(results, status) {
      if (status === "ZERO_RESULTS") {
        return;
      }
      console.log(results);
      this._latlng = results[0].geometry.location
    }.bind(this))
  }

});
