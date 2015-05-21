Welp.Views.RestaurantBox = Backbone.CompositeView.extend({
  tagName: "section",
  className: "restaurant-list-box-thing",

  template: JST["restaurants/box"],

  initialize: function () {
    this.listenTo(this.collection, "add", this.addRestaurantListItem);
    this.listenTo(this.collection, "sync", this.render)

    this.collection.each(this.addRestaurantListItem.bind(this));
  },

  addRestaurantListItem: function(model) {
    // if it hasn't been fetched yet, return early
    if (typeof model.get("ord") === "undefined") {
      return;
    };

    var view = new Welp.Views.RestaurantList({
      model: model,
      collection: this.collection
    });
    this.addSubview(".restaurant-list", view);
  },

  render: function() {
    var content = this.template({ restaurants: this.collection })
    this.$el.html(content);

    this.attachSubviews();

    return this;
  }
})
