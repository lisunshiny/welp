Welp.Views.ReviewForm = Backbone.View.extend({
  tagName: "form",

  className: "review-form",

  events: {
    "click .submit-review": "submit",
    "change #input-review-image": "fileInputChange"
  },

  initialize: function (opts) {
    this.restaurant = opts.restaurant;
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.restaurant, "sync", this.render);

  },

  template: JST["reviews/form"],

  render: function() {
    var content = this.template({ restaurant: this.restaurant });
    this.$el.html(content);

    return this;
  },

  submit: function() {
    event.preventDefault();
    var attrs = this.$el.serializeJSON().review;
    var that = this;

    this.model.save(attrs, {
      success: function() {
        that.collection.add(that.model);
        router.flashes = "Your review has been successfully submitted."
        Backbone.history.navigate("restaurants/" + that.restaurant.id, { trigger: true });
      },

      error: function(model, response) {
        var errors = $.parseJSON(response.responseText).join(", ")
        var $container = that.$el.find(".error-messages")

        $container.html(errors);
      }
    });
  },

  fileInputChange: function(event) {
    var that = this;
    var pic = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      that._updatePreview(reader.result);
      that.model.addImage(reader.result)
    };

    if (pic) {
      reader.readAsDataURL(pic)
    }
    else {
      // that._updatePreview("");
      // delete that.model._image;
    }
  },

  _updatePreview: function(src) {
    // set this._num to be equal to -1 if it doesn't exist yet
    // it'll become 1 after ++
    typeof this._num === "number" || (this._num = -1);
    this._num ++;

    var newThumb = $("<img>").attr("src", src)
    var newFigure = $("<figure>").attr("data-num", this._num).html(newThumb);
    this.$el.find(".attached-images").append(newFigure);
    // todo: clear out thing;
  }

})
