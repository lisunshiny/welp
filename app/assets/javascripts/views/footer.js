Welp.Views.Footer = Backbone.View.extend({
  className: "footer-div",
  template: JST["footer"],

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
})
