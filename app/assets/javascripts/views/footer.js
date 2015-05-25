Welp.Views.Footer = Backbone.CompositeView.extend({
  className: "footer-div",
  template: JST["footer"],

  initialize: function() {
  },

  events: {
    "click .modal-open": "openModal"
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  openModal: function() {
    console.log("open modal")
    router.$modal.html(new Welp.Views.Modal().render().$el);
    router.$modal.attr("id", "modal-visible");
  }
})
