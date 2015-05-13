Welp.Collections.Restaurants = Backbone.Collection.extend({
  url: "/api/restaurants",
  model: Welp.Models.Restaurant,

  getOrFetch: function(id) {
    var model = this.find(id)

    if (!model) {
      model = new Welp.Models.Restaurant({ id: id });

    }
    this.add(model, { merge: true });
    model.fetch();

    return model;
  }
})
