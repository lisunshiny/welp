Welp.Views.RestaurantForm = Backbone.View.extend({
  tagName: "form",

  className: "restaurant-form",

  events: {
    "click .submit-restaurant": "submit"
  },

  initialize: function (opts) {
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST["restaurants/form"],

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  submit: function() {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var that = this;

    this.model.save(attrs, {
      success: function() {
        that.collection.add(that.model);
        Backbone.history.navigate("", { trigger: true });
      },

      error: function(model, response) {
        debugger;
        console.log(response);
      }
    });
  }
})
