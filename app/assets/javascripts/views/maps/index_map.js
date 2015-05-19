Welp.Views.IndexMap = Backbone.View.extend({
  // Initialization
  attributes: {
    class: "index-map-canvas"
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

  render: function () {
    // Call this method `render` if you like; I've changed the name so users
    // need to be deliberate about calling it. The important part is that the
    // map object should only be instantiated ONCE for a given MapShow view.
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167 },
      zoom: 12
    };

    this._map = new google.maps.Map(this.el, mapOptions);
  }
});