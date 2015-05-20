Welp.Views.ShowMap = Backbone.View.extend({
  attributes: {
    class: "show-map-canvas"
  },

  // initialize: function() {
  //   this.listenTo(this.model, "sync", this.initMap)
  // },

  initMap: function() {
    var mapOptions = { center: this.model.get("position"),
    zoom: 15 }

    this._map = new google.maps.Map(this.el, mapOptions);
    this.addMarker();
  },

  addMarker: function() {
    this.model.marker().setMap(this._map);
  }
})
