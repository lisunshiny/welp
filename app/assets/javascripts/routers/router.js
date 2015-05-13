Welp.Routers.Router = Backbone.Router.extend({
  initialize: function(opts) {
    this.$rootEl = opts.$rootEl;
    this.collection = new Welp.Collections.Restaurants();
    this.collection.fetch();
  },

  routes: {
    "": "restaurantsIndex",
    "restaurants/new": "restaurantNew",
    "restaurants/:id": "restaurantShow"
  },

  restaurantsIndex: function() {
    var view = new Welp.Views.RestaurantsIndex({
      collection: this.collection
    })
    this.swapView(view)
  },

  restaurantNew: function() {
    var view = new Welp.Views.RestaurantForm({
      model: new Welp.Models.Restaurant(),
      collection: this.collection
    })

    this.swapView(view)
  },

  restaurantShow: function(id) {
    var view = new Welp.Views.RestaurantShow({
      model: this.collection.getOrFetch(id)
    })

    this.swapView(view)
  },

  swapView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }






})
