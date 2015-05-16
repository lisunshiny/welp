Welp.Views.ReviewShow = Backbone.View.extend({
  tagName: "li",
  className: "review-show",

  initialize: function () {
    this.listenTo(this.model, "sync change", this.render)
  },

  template: JST["reviews/show"],

  render: function() {
    var content = this.template({ review: this.model });
    this.$el.html(content);
    return this;
  },

  submit: function() {

  }
})
