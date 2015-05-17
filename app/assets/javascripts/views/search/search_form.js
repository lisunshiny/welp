Welp.Views.SearchForm = Backbone.View.extend({
  tagName: "form",

  className: "search-form",

  events: {
    "click .submit-search": "submit"
  },

  initialize: function (opts) {
  },

  template: JST["search/form"],

  render: function() {
    var content = this.template({ restaurant: this.restaurant });
    this.$el.html(content);

    return this;
  },

  submit: function() {
    event.preventDefault();
    var params = this.$el.serializeJSON();

    Backbone.history.navigate("search?query=" + params["query"] + "&loc=" + params["loc"], { trigger: true })

  }
})
