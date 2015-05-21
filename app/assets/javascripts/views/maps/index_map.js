Welp.Views.IndexMap = Backbone.View.extend({
  // Initialization
  attributes: {
    class: "index-map-canvas"
  },

  initialize: function(opts) {
    if (typeof opts.center === "undefined") {
      this.center = { lat: 40.724948, lng: -73.9967097 }
    }
    else {
      this.center = opts.center;

    }

    this.listenTo(this.collection, "sync", this.addMarkers)
  },

  initMap: function () {

    var mapOptions = {
      center: this.center,
      zoom: 12,
    };

    this._map = new google.maps.Map(this.el, mapOptions);

    //set a marker at the center of the screen
    var centerMarker = new google.maps.Marker({
      position: this.center,
      map: this._map,
      zIndex: -1
    })

    this.addMarkers();
  },

  addMarkers: function() {
    // return if not fetched yet.
    if (this.collection.length === 0) {
      return;
    }

    this._markers && this.clearMarkers();

    var that = this;
    var markers = this.collection.markers();
    this._markers = _([]);

    for(ord in markers) {
      var marker = markers[ord];
      var url = "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld="
        + ord
        + "|FF0000|FFFFFF"

      marker.setIcon(url);
      marker.setMap(that._map);

      this._markers.push(marker);
    };

  },

  clearMarkers: function() {
    this._markers.each(function(marker) {
      marker.setMap(null);
    });
  }


});
