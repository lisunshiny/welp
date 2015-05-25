Welp.Views.Header = Backbone.CompositeView.extend({
  tagName: "nav",
  className: "header-nav clearfix",

  events: {
    "click .home-link": "goHome"
  },

  template: JST["header"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);

    this.addSubview(".search", new Welp.Views.SearchForm({
      collection: new Welp.Collections.SearchResults()
    }))
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  goHome: function() {
    console.log("home")
    window.router.navigate("/", { trigger: true });
  }
})
