define([
  // Application.
  "app"
],

function(app) {

  var Tools = app.module();

  Tools.Views.Standard = Backbone.View.extend({
    template: "tools/standard"
  });

  Tools.Views.Capture = Backbone.View.extend({
    template: "tools/capture",

    events: {
      "click button": "captured"
    },

    captured: function(ev) {
      app.trigger("photo:capture");
    }
  });

  return Tools;

});
