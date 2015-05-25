_.extend(Backbone.Router.prototype,{

    refresh: function() {

        var _tmp = Backbone.history.fragment;

        this.navigate( _tmp + (new Date).getTime() );

        this.navigate( _tmp, { trigger:true } );

    }

});
