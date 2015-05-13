Welp.Views.RestaurantsIndex = Backbone.View.extend({
  initialize: function () {

  },

  template: JST["restaurants/index"],

  render: function() {
    var content = this.template({ restaurants: this.collection });
    this.$el.html(content);

    return this;
  }

})
