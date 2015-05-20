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

  marker: function() {

    if (this._marker === null || this._marker) {}
    else {
      this.setMarker();
    }

    return this._marker;
  },

  setMarker: function() {
    if (this.get("position").lat) {

      this._marker = new google.maps.Marker({
        position: this.get("position"),
        // I know this is going to be deprecated soon
        // icon: {
        //   url: "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=" + this.get("ord") + "|FF0000|FFFFFF"
        // }
      })
    }
    else {
      this._marker = null
    }

  }

});
