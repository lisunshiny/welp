Welp.Views.RestaurantForm = Backbone.View.extend({
  tagName: "form",

  className: "restaurant-form",

  events: {
    "click .submit-restaurant": "submit",
    "change #input-restaurant-image": "fileInputChange",
    "click .delete-button": "delete"
  },

  initialize: function (opts) {
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST["restaurants/form"],

  render: function() {

    if (!this.model.isNew() && this.model.get("user_id") != window.id) {
      this.$el.html("You can't edit this!");
      return this;
    }
    var content = this.template({ restaurant: this.model });
    this.$el.html(content);

    return this;
  },

  submit: function() {
    event.preventDefault();
    var attrs = this.$el.serializeJSON().restaurant;
    var that = this;
    var isNew = this.model.isNew();

    this.model.save(attrs, {
      success: function() {
        that.collection.add(that.model);
        if (isNew) {
          router.flashes = "Your restaurant has been successfully created!"
        } else {
          router.flashes = "Your restaurant has been successfully updated."
        }
        Backbone.history.navigate("restaurants/" + that.model.id, { trigger: true });
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
  },

  delete: function(event) {
    this.model.destroy({
      success: function() {
        console.log("deeted");
        router.flashes = "your restaurant has been deleted"
        Backbone.history.navigate("", { trigger: true});
      }
    });
  }
})
