Welp.Views.RestaurantList = Backbone.View.extend({
  tagName: "li",
  className: "restaurant-list-item clearfix",

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST["restaurants/list_item"],

  events: {
    "mouseenter": 'highlight',
    "mouseleave": 'unhighlight'

  },

  render: function() {
    var content = this.template({ restaurant: this.model });
    this.$el.html(content);
    return this;
  },

  highlight: function() {
    if (this.model.marker()) {
      this.model.marker().setAnimation(google.maps.Animation.BOUNCE);
    }
  },

  unhighlight: function() {
    if (this.model.marker()) {
      this.model.marker().setAnimation(null);
    }
  }
})
