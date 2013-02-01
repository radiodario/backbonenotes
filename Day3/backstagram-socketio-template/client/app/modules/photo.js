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

  // TK: We need to overwrite the photo.model sync method to work with
  // websockets. We are going to store these photos on the server instead of
  // local storage!
  Photo.Model.prototype.sync = function(method, model, options) {
    app.socket.emit(

      // TK: first parameter is the event name we are emitting.
      // what should the event we are emitting look like here?
      // HINT: look at the server code. What are the names of the
      // events that have to do with a single photo? How might you
      // formulate them using the 'method' parameter?
      method + ':photo', 
      
      // TK: second parameter is the actually data we are sending
      // along. Our data is the photo, so what might we want to send?
      // Do we send the actual model or maybe just its json form?
      // the serialized form of this model
      model.toJSON(), 
      
      // this part I am just going to give you all. This is the callback
      // that will be executed. If the message is set, then something failed.
      // otherwise if it's null, then we are just going to call our success
      // callback.
      function(message, data) {
        // if there was a message passeed then
        // we have an error. Output it and call the error callback
        // passed into the options
        if (message) {
            console.log("...error: " + message);
            return options.error(message);
        }
        // If no message was provided, then just call the success callback
        // that was passed in the options.
        options.success(model, data, options);
    });
  };

  // Default collection.
  Photo.Collection = Backbone.Collection.extend({
    model: Photo.Model,
    // we can't use both at the moment because the local storage
    // plugin modifies the sync method too. 
    // localStorage: new Backbone.LocalStorage("demo"),

    initialize: function() {

      var self = this;
      
      // TK: When the new:photo event comes in, what should we do with it?
      // we've just recieved a new model so we probably want to do one of 
      // two things:
      // 1. add it to the gallery
      // 2. re-render the actual view
      // One of these parts is already going to happen. Do you which one and why?
        // re-render is handled by the view, since it is subsribed to the add method
      app.socket.on("new:photo", function(model) {

        if (model.id >= self.length)
          self.add(model);
        // TK: Pick whichever one of the above two actions needs to happen
        // and do it here!
      });

      app.socket.on("read:photos", function(model) {
        self.fetch()
      });

    }


  });

  Photo.Collection.prototype.sync = function(method, collection, options) {
    app.socket.emit(
      method + ':photos',
      collection.toJSON(),
      function(message, data) {
        if (message) {
          console.log("...error: " + message);
          return options.error(message);
        }
        options.success(collection, data, options);
      });
  };

  // TK: It looks like we actually need to overwrite the photo
  // collection sync method too! 
  // Take a CLOSE look at how we did it for the Photo.Model. It's going to be
  // very similiar except it needs to emit a slightly different event.
  // instead of being in the "photo" (single) namespace it needs to be in
  // the "photos" name space. The rest, should be pretty clear eh?
  // HINT: while the function signature says "model"... it isn't one, is it?

  Photo.Views.Gallery = Backbone.View.extend({
    template: "photo/gallery",

    initialize: function() {
      this.collection.on("reset add destroy", this.render, this);
    },

    serialize: function() {
      return { gallery: this.collection };
    },

    cleanup: function() {
      app.socket.removeListener(null, null);
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
          var caption = $('.caption').val()
          collection.create({ data: data, caption: caption});

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
