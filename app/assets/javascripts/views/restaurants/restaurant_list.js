Welp.Views.RestaurantList = Backbone.View.extend({
  tagName: "li",
  className: "restaurant-list-item clearfix",

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST["restaurants/list_item"],

  render: function() {
    var content = this.template({ restaurant: this.model });
    this.$el.html(content);
    return this;
  }
})
