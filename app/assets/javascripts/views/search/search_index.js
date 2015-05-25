Welp.Views.SearchIndex = Welp.Views.RestaurantsIndex.extend({

  render: function() {
    var content = this.template({ restaurants: this.collection, flashes: router.flashes });
    this.$el.html(content);
    this.$el.find("h2").html("Search results" );

    this.attachSubviews();

    if (typeof this._rendered === "undefined") {
      this.$el.find(".index-map-container").html(this.indexMapView.$el);
      this.indexMapView.initMap();
      this._rendered = true;
    }

    return this;
  },



})
