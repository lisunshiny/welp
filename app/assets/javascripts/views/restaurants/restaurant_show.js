Welp.Views.RestaurantShow = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model.reviews(), "add", this.addSubviewReview);

    this.showMapView = new Welp.Views.ShowMap({
      model: this.model
    })

    this.model.reviews().each(this.addSubviewReview.bind(this));
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

    if (typeof this.model.get("name") != "undefined") {
      this.$el.find(".show-map-container").html(this.showMapView.$el);
      this.showMapView.initMap();
    }

    return this;
  },




})
