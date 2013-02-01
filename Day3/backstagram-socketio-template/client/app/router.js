define([
  // Application.
  "app",

  // Modules.
  "modules/photo",
  "modules/tools"
],

function(app, Photo, Tools) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    initialize: function() {
      this.gallery = new Photo.Collection();
    },

    routes: {
      "": "index",
      "take": "take",
      "upload": "upload",
      "photo/:id": "photo"
    },

    index: function() {
      app.useLayout("layouts/base").setViews({
        
        // Put the standard toolbar in the side bar.
        ".side-bar": new Tools.Views.Standard(),

        // Put the photo gallery into the content area.
        ".content": new Photo.Views.Gallery({
          collection: this.gallery
        })

      }).render();

      // Ensure the gallery is up-to-date.
      this.gallery.fetch();
    },

    take : function() {

      app.useLayout("layouts/base").setViews({
        // Put the capture toolbar in the side bar.
        ".side-bar": new Tools.Views.Capture(),

        // Put the photo gallery into the content area.
        ".content": new Photo.Views.Take({
          collection: this.gallery
        })
      }).render();

    },

    upload : function() {

      // Main page uses the base layout.
      app.useLayout("layouts/single").setViews({
        // Put the photo gallery into the content area.
        ".content": new Photo.Views.Upload({
          collection: this.gallery
        })
      }).render();
    },

    photo : function(id) {

      var self = this;

      var renderPhoto = function() {
        // Main page uses the base layout.
        app.useLayout("layouts/single").setViews({
          // Put the standard toolbar in the side bar.
          ".side-bar": new Tools.Views.Standard(),

          // Put the photo gallery into the content area.
          ".content": new Photo.Views.Detail({ model: self.gallery.get(id) })
        }).render();
      };

      // If we are coming in directly into a photo, we need
      // to make sure we have the gallery available.
      if (this.gallery.length === 0) {
        this.gallery.fetch({
          success: renderPhoto
        });
      } else {
        renderPhoto();
      }
    }

  });

  return Router;

});
