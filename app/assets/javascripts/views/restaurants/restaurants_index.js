Welp.Views.RestaurantsIndex = Backbone.CompositeView.extend({
  className: "clearfix restaurant-index",
  initialize: function () {
    this.indexMapView = new Welp.Views.IndexMap({
      collection: this.collection
    });
    this.refreshSubview();
    this.pageNum = 1;
  },

  refreshSubview: function() {
    this.subview && this.removeSubview("", this.subview);

    this.subview = new Welp.Views.RestaurantBox({
      collection: this.collection
    });

    this.addSubviewWithoutRender(".restaurant-list-box", this.subview);
  },

  events: {
    "click .next-page": "nextPage",
    "click .prev-page": "prevPage"
  },

  template: JST["restaurants/index"],

  render: function() {
    var content = this.template({ restaurants: this.collection });
    this.$el.html(content);
    this.attachSubviews();

    if (typeof this._rendered === "undefined") {
      this.$el.find(".index-map-container").html(this.indexMapView.$el);
      this.indexMapView.initMap();
      this._rendered = true;
    }

    return this;
  },

  prevPage: function(event) {
    // event.preventDefault;
    // this.pageNum = this.pageNum - 1
    // alert(this.pageNum);
    //
    // this.collection.fetch({
    //   data: {
    //     page_num: this.pageNum
    //   },
    //
    //   success: function() {
    //     alert("hi");
    //   }
    // })


  },

  nextPage: function() {
    event.preventDefault;

    this.collection.currentPage = this.collection.currentPage + 1
    var that = this;

    this.collection.fetch({
      data: { page_num: this.collection.currentPage },
      success: function() {
        that.refreshSubview();

        console.log("page up")

      }
    });
  }
})
