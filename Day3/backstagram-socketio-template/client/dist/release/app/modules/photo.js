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
      this.collection.on("reset", this.render, this);
    },

    serialize: function() {
      return { gallery: this.collection };
    },

    cleanup: function() {
      this.collection.off(null, null, this);
    }
  });

  Photo.Views.Take = Backbone.View.extend({
    template: "photo/take",

    initialize: function() {
      app.on("photo:capture", function() {
        var collection = this.collection;

        // Turn it into vintage.
        vintage.process(this.canvas.toDataURL(), function(data) {
          collection.create({ data: data });

          app.router.navigate("", true);
        });

      }, this);
    },

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

  Photo.Views.Detail = Backbone.View.extend({
    template: "photo/detail",

    events: {
      "click button": "destroy"
    },

    destroy: function(ev) {
      this.model.destroy();

      app.router.navigate("", true);
    },

    serialize: function() {
      return { photo: this.model };
    }
  });
  
  // Return the module for AMD compliance.
  return Photo;

});
