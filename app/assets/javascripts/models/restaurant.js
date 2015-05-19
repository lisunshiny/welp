Welp.Models.Restaurant = Backbone.Model.extend({
  urlRoot: "api/restaurants",

  parse: function(json) {
    if (json.reviews) {
      this.reviews().set(json.reviews, { parse: true });
      delete json.reviews;
    }

    // geocode and build marker upon fetch
    this.setMarker(json);

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

  setMarker: function(json) {
    var request = {
      address: json.address1 + "," + json.address2
    };

    var geocoder = new google.maps.Geocoder();

    return geocoder.geocode(request, function(results, status) {
      if (status === "ZERO_RESULTS") {
        return;
      }

      // if there's a matching location, make a marker
      var latlng = results[0].geometry.location

      this._marker = new google.maps.Marker({
        position: latlng
      })
    }.bind(this))
  }

});
