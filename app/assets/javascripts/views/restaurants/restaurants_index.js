Welp.Views.RestaurantsIndex = Backbone.CompositeView.extend({
  className: "clearfix restaurant-index",
  initialize: function () {
    this.listenTo(this.collection, "add", this.addRestaurantListItem);

    this.indexMapView = new Welp.Views.IndexMap({
      collection: this.collection
    });

    this.collection.each(this.addRestaurantListItem.bind(this));
  },

  events: {
    "click .next-page": "nextPage",
    "click .prev-page": "prevPage"
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
    debugger;
    var content = this.template({ restaurants: this.collection });
    this.$el.html(content);
    this.attachSubviews();

    if (typeof this._rendered === "undefined") {
      this.$el.find(".index-map-container").html(this.indexMapView.$el);
      this.indexMapView.initMap();
      this._rendered = true;
    }

    return this;
  },

  prevPage: function() {
    alert("prev");
  },

  nextPage: function() {
    alert("next");
  }
})
