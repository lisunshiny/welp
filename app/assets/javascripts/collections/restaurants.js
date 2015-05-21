Welp.Collections.Restaurants = Backbone.Collection.extend({
  url: "/api/restaurants",
  model: Welp.Models.Restaurant,

  initialize: function() {
    this.currentPage = 1;
  },

  parse: function(json) {
    this.totalPages = json.total_pages;
    this.currentPage = json.current_page;
    return json.restaurants;
  },

  getOrFetch: function(id) {
    var model = this.find(id)

    if (!model) {
      model = new Welp.Models.Restaurant({ id: id });

    }
    this.add(model, { merge: true });
    model.fetch();

    return model;
  },

  //todo: make this more efficient.
  markers: function() {
    this._markers = {};

    var that = this

    _(this.models).each(function(restaurant) {
      if (restaurant.marker()) {
        that._markers[restaurant.get("ord")] = restaurant.marker();
      }
    });

    return this._markers;
  },

  notOnFirst: function() {
    return this.currentPage !== 1
  },

  notOnLast: function() {
    return this.currentPage !== this.totalPages
  }

})
