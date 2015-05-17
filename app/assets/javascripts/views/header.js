Welp.Views.Header = Backbone.View.extend({
  tagName: "nav",
  className: "header-nav clearfix",

  template: JST["header"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    return this;
  }
})
