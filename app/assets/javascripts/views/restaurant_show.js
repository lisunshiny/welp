Welp.Views.RestaurantShow = Backbone.CompositeView.extend({
  initialize: function() {

  },

  template: JST["restaurants/show"],

  events: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({ restaurant: this.model });
    this.$el.html(content);

    return this;
  }


})
