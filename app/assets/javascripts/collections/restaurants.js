Welp.Collections.Restaurants = Backbone.Collection.extend({
  url: "/api/restaurants",
  model: Welp.Models.Restaurant,

  getOrFetch: function(id) {
    var model = this.find(id)

    if (!model) {
      model = new Welp.Models.Restaurant({ id: id });

    }
    this.add(model, { merge: true });
    model.fetch();

    return model;
  },

  whatever: function() {
    alert("hi");
  },

  //todo: make this more efficient.
  markers: function() {
    this._markers = _([]);

    var that = this

    _(this.models).each(function(restaurant) {
      if (restaurant.marker()) {
        that._markers.push(restaurant.marker());
      }
    });

    return this._markers;
  }

})
