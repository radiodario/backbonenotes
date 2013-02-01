define([
  // Application.
  "app",

  // The vintage processor.
  "modules/vintage"
],

// Map dependencies from above array.
function(app, vintage) {

  // Create a new module.
  var Photo = app.module();

  // Default model.
  Photo.Model = Backbone.Model.extend({});

  // Default collection.
  Photo.Collection = Backbone.Collection.extend({
    model: Photo.Model,
    localStorage: new Backbone.LocalStorage("demo")
  });

  Photo.Views.Gallery = Backbone.View.extend({
    template: "photo/gallery",

    initialize: function() {
      // Whenever our collection gets reset, re-render this view
      this.collection.on("reset", this.render, this);
    },

    serialize: function() {
      // the serialize method gets called before a template is rendered
      // and this is the data that it recieves!
      // TK: take a look at the template. What variable does it expect?
      // What should its value be?
      // Return an object that will match the template!
      return {
        gallery: this.collection
      }
    },

    cleanup: function() {
      // TK: What might this cleanup method look like?
      // Any events we might want to unbind?
      this.collection.off("reset");
      app.off(null, null, this);
    }
  });

  Photo.Views.Take = Backbone.View.extend({
    template: "photo/take",

    initialize: function() {

      // THIS IS THE MEAT Of the app!
      // When a photo:capture event is triggered (remember where?)
      // We make it vintage, then create a model on the collection
      // and then go back to the index page.
      app.on("photo:capture", function() {
        var collection = this.collection;

        // Turn it into vintage.
        vintage.process(this.canvas.toDataURL(), function(data) {
          collection.create({ data: data });

          app.router.navigate("", true);
        });

      }, this);
    },

    // This method captures a photo from the video feed in our canvas
    // element. It's totally outside the scope of the class, but it's 
    // pretty cool!
    afterRender: function() {
      var video = this.$("video")[0];
      var canvas = this.canvas = this.$("canvas")[0];
      var ctx = this.ctx = this.canvas.getContext("2d");

      function error() {
        this.$("video").replaceWith("<h3>Error, camera not available.</h3>");
      }

      // Set the camera to the video tag.
      navigator.getUserMedia({ video: true }, function(raw, cooked) {
        video.src = cooked || raw; 

        // Whenever the frame changes, update the ghost canvas.
        video.addEventListener("timeupdate", function() {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight); 
        }, false);
      }, error);
    },

    cleanup: function() {
      var video = this.$("video")[0];

      // This fixes a known bug in Chrome that keeps the camera running even
      // after destroying the video element.
      if (video) {
        video.src = undefined;
      }

      app.off(null, null, this);
    }
   
  });

  Photo.Views.Upload = Backbone.View.extend({
    template: "photo/upload",

    events: {
      "change input": "upload"
    },

    upload: function(ev) {
      var collection = this.collection;

      var file = ev.originalEvent.target.files[0];
      var reader = new FileReader();
      var canvas = this.$("canvas")[0];
      var ctx = canvas.getContext("2d");

      reader.onload = function(ev) {
        // Turn it into vintage.
        vintage.process(ev.target.result, function(data) {
          collection.create({ data: data });

          app.router.navigate("", true);
        });
      };

      reader.readAsDataURL(file);
    }
  });

  // TK: Let's render an actual photo!
  // This is your starting line:
  Photo.Views.Detail = Backbone.View.extend({
    model: Photo.Model,
  // 1. What's the template it should be using?
    template: 'photo/detail',
  // 2. There is one event on the photo: You click the
  //    delete button and the model should be destroyed
  //    and the app should redirect back to the index page.
    events: {
      'click .delete' : 'destroyPhoto'
    },

    destroyPhoto : function() {
      this.model.destroy();
      app.router.navigate("", true);
    },

  // 3. The photo needs to serialize itself. Look at the detail 
  //    template. What variables does it expect?
    serialize : function() {
      return { 
        photo: this.model
      };
    }
  });
  // Return the module for AMD compliance.
  return Photo;

});
