define([
  // Application.
  "app"
],

function(app) {

  var Tools = app.module();

  Tools.Views.Standard = Backbone.View.extend({
    template: "tools/standard"
  });

  // TK: let's add the capture toolbar!
  // You need to do two things:
  // 1. Take a look at its template. Do you know which one?
  // Make sure to set the correct template for this view.
  // 2. It's got one button.
  // When the button is pressed, you need to trigger
  // an event called 'photo:capture' on the app.
  // wire that up!
  Tools.Views.Capture = Backbone.View.extend({
    template: "tools/capture", 
    events: {
      'click button' : 'capturePhoto'
    },

    capturePhoto: function(event) {
      event.preventDefault();
      app.trigger('photo:capture');
    }

  });

  return Tools;

});
