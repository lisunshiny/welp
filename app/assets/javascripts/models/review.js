Welp.Models.Review = Backbone.Model.extend({
  urlRoot: "api/reviews",

  initialize: function() {
    this._images = []
  },

  toJSON: function() {
    var json = {
      review: _.clone(this.attributes),
      review_images: _.clone(this._images)
    };

    return json;
  },

  addImage: function(image) {
    var obj = {
      image: image
    }

    this._images.push(obj);
  }

});
