Welp.Collections.Users = Backbone.Collection.extend({

  getOrFetch: function(id) {
    var model = this.find(id)

    if (!model) {
      model = new Welp.Models.User({ id: id });

    }
    this.add(model, { merge: true });
    model.fetch();

    return model;
  }
})
