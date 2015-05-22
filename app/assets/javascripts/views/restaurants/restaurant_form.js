Welp.Views.RestaurantForm = Backbone.View.extend({
  tagName: "form",

  className: "restaurant-form",

  events: {
    "click .submit-restaurant": "submit",
    "change #input-restaurant-image": "fileInputChange"
  },

  initialize: function (opts) {
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST["restaurants/form"],

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  submit: function() {
    event.preventDefault();
    var attrs = this.$el.serializeJSON().restaurant;
    var that = this;

    this.model.save(attrs, {
      success: function() {
        that.collection.add(that.model);
        Backbone.history.navigate("", { trigger: true });
      },

      error: function(model, response) {
        var errors = $.parseJSON(response.responseText).join(", ")
        var $container = that.$el.find(".error-messages")

        $container.html(errors);
        console.log(response);
      }
    });
  },

  fileInputChange: function(event) {
    var that = this;
    var pic = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      that._updatePreview(reader.result);
      that.model._image = reader.result;
    };

    if (pic) {
      reader.readAsDataURL(pic)
    }
    else {
      that._updatePreview("");
      delete that.model._image;
    }
  },

  _updatePreview: function(src) {
    this.$el.find(".preview-restaurant-pic").attr("src", src);
  }
})
