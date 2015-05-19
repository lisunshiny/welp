Welp.Views.RestaurantsIndex = Backbone.CompositeView.extend({
  className: "clearfix",
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addRestaurantListItem);

    // obsolete?
    this.addSubview(".new-restaurant-form", new Welp.Views.RestaurantForm({
      model: new Welp.Models.Restaurant(),
      collection: this.collection,
    }));

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

    this.$el.find(".index-map-container").html(this.indexMapView.$el);
    this.indexMapView.initMap();

    return this;
  }

})
