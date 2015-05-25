Welp.Views.Modal = Backbone.View.extend({
  template: JST["about"],

  events: {
    "click .close-modal": "closeModal"
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.delegateEvents();
    return this;
  },

  closeModal: function() {
    console.log("hi")
    router.$modal.attr("id", "");
  }
})
