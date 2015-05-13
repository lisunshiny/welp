Welp.Views.ReviewForm = Backbone.View.extend({
  tagName: "form",

  className: "review-form",

  events: {
    "click .submit-review": "submit"
  },

  initialize: function (opts) {
    this.restaurant = opts.restaurant;
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST["reviews/form"],

  render: function() {
    var content = this.template({ restaurant: this.restaurant });
    this.$el.html(content);

    return this;
  },

  submit: function() {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();

    this.model.save(attrs, {
      success: function() {
        this.collection.add(this.model);
        Backbone.history.loadUrl();
      }
    });
  }
})
