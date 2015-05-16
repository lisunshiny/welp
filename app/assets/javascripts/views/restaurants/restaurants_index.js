Welp.Views.RestaurantsIndex = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);

    this.addSubview(".new-restaurant-form", new Welp.Views.RestaurantForm({
      model: new Welp.Models.Restaurant(),
      collection: this.collection,
    }));
  },


  template: JST["restaurants/index"],

  render: function() {
    var content = this.template({ restaurants: this.collection });
    this.$el.html(content);

    return this;
  }

})
