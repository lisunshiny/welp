Welp.Routers.Router = Backbone.Router.extend({
  initialize: function(opts) {
    this.$rootEl = opts.$rootEl;
    this.$header = opts.$header;
    this.$footer = opts.$footer;
    this.$flash = opts.$flash

    this.collection = new Welp.Collections.Restaurants();
    this.collection.fetch();

    this.users = new Welp.Collections.Users();

    this.currentUser = new Welp.Models.CurrentUser();
    this.currentUser.fetch();
    this.renderHeader();
  },

  routes: {
    "": "restaurantsIndex",
    "search?query=:query&loc=:loc": "restaurantSearch",
    "restaurants/new": "restaurantNew",
    "restaurants/:id/reviews/new": "reviewNew",
    "restaurants/:id/edit": "restaurantEdit",
    "restaurants/:id": "restaurantShow",
    "users/:id": "userShow",
    "map": "map"
  },

  renderHeader: function() {
    var view = new Welp.Views.Header({
      model: this.currentUser
    });

    this.$header.html(view.render().$el);
  },

  renderFooter: function() {
    var view = new Welp.Views.Footer();

    this.$footer.html(view.render().$el);
  },

  restaurantsIndex: function() {
    console.log("router")
    this.collection.fetch();
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

  reviewNew: function(id) {
    var restaurant = this.collection.getOrFetch(id);
    var view = new Welp.Views.ReviewForm({
      model: new Welp.Models.Review(),
      collection: restaurant.reviews(),
      restaurant: restaurant
    })

    this.swapView(view);
  },

  restaurantShow: function(id) {
    this.$rootEl.removeClass("most-pages")
    var view = new Welp.Views.RestaurantShow({
      model: this.collection.getOrFetch(id)
    })

    this.swapView(view);

  },

  restaurantEdit: function(id) {
    console.log("ohai");
    var restaurant = this.collection.getOrFetch(id);
    var view = new Welp.Views.RestaurantForm({
      model: restaurant,
      collection: this.collection
    })

    this.swapView(view);
  },

  restaurantSearch: function(query, loc) {
    var results = new Welp.Collections.SearchResults()
    var params = { query: query, loc: loc }

    results.fetch({ data: params })

    var view = new Welp.Views.SearchIndex({
      params: params,
      collection: results
    });

    this.swapView(view)
  },

  userShow: function(id) {
    var view = new Welp.Views.UserShow({
      model: this.users.getOrFetch(id)
    })

    this.swapView(view)
  },

  map: function() {
    var view = new Welp.Views.IndexMap();
    this.swapView(view);
    view.initMap();
  },

  swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;

    this.$rootEl.html(view.$el);
    view.render();
  }






})
