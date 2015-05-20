Welp.Views.IndexMap = Backbone.View.extend({
  // Initialization
  attributes: {
    class: "index-map-canvas"
  },

  initialize: function() {
    this.listenTo(this.collection, "sync", this.addMarkers)
  },

  initMap: function () {
    // Call this method `render` if you like; I've changed the name so users
    // need to be deliberate about calling it. The important part is that the
    // map object should only be instantiated ONCE for a given MapShow view.
    var mapOptions = {
      center: { lat: 40.724948, lng: -73.9967097 },
      zoom: 12
    };

    this._map = new google.maps.Map(this.el, mapOptions);

  },

  addMarkers: function() {

    // return if not fetched yet.
    if (this.collection.length === 0) {
      return;
    }

    var that = this;

    this.collection.markers().each(function(marker) {
      marker.setMap(that._map);
    })
  }


});
