Welp.Views.RestaurantsIndex = Backbone.CompositeView.extend({
  className: "clearfix",
  initialize: function () {
    this.listenTo(this.collection, "sync", this.renderAfterFetch);
    this.listenTo(this.collection, "add", this.addRestaurantListItem);

    this.indexMapView = new Welp.Views.IndexMap({
      collection: this.collection
    });

    this.collection.each(this.addRestaurantListItem.bind(this));
  },

  addRestaurantListItem: function(model) {
    var view = new Welp.Views.RestaurantList({
      model: model,
      collection: this.collection
    });

    this.addSubview(".restaurant-list", view);
  },


  template: JST["restaurants/index"],

  render: function() {
    var content = this.template({ restaurants: this.collection });
    this.$el.html(content);
    this.attachSubviews();


    return this;
  },

  renderAfterFetch: function() {

    this.render();
    //put the empty el on the page
    this.$el.find(".index-map-container").html(this.indexMapView.$el)
    //put the map on the screen
    var map = this.indexMapView.initMap();
    //put the markers on the screen
    this.collection.putMarkers(map);
  }

})
