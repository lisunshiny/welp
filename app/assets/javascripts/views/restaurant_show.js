Welp.Views.RestaurantShow = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.reviews(), "add", this.addSubviewReview);

    this.model.reviews().each(this.addSubviewReview.bind(this));

    this.addSubview(".new-review-form", new Welp.Views.ReviewForm({
      model: new Welp.Models.Review(),
      collection: this.model.reviews(),
      restaurant: this.model
    }));

  },


  addSubviewReview: function(model) {
    var view = new Welp.Views.ReviewShow({
      model: model,
      collection: this.model.reviews()
    })

    this.addSubview(".review-list", view)
  },


  template: JST["restaurants/show"],

  events: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({ restaurant: this.model });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }


})
