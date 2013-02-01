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
      
      // TK: All initialization happens here!
      // Why don't we create a photo gallery here that will be accessible
      // anywhere that has access to `this`?
      // Call it: this.gallery.
      this.gallery = new Photo.Collection();

    },

    routes: {
      
      // Home page route: ''
      "": "index",

      // Photo taking route
      "take": "take",

      // Uploading a photo route:
      "upload": "upload",

      // TK: Let's make a route for showing the photo! 
      // Call it anything you'd like. 
      // Should this route take any parameters?
      "photo/:id" : "view"

    },

    index: function() {

      // TK: The home page has all the photos
      // as well as the buttons to add new photos
      // Let's get them rendering!

      // TK: First ensure the gallery has all the items.
      // this.gallery...
      // TK: Now we actually want to render the layout of the page
      // Which layouts do we have? Which layout is this? 
      // app.useLayout("<WhichLayout?!>").setViews({
      //    There are two parts to this layout:
      //    the '.side-bar' that should have one of the tool bars
      //    the '.content' should have a gallery view of this.gallery.
      // });
      // don't forget to actually call .render()!
      app.useLayout("layouts/base").setViews({
        ".side-bar" : new Tools.Views.Standard(),
        ".content"  : new Photo.Views.Gallery({
          collection: this.gallery
        })
      }).render();
      this.gallery.fetch()
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

    // TK: Let's make a handler for the photo showing route!
    // Things to think about:
    // 1. What parameters should the function take?
    // 2. What should the function do?
    //      Make sure that the gallery has all the photos
    //      Make sure you actually get the photo you are showing!
    //      Render the layout
    // 3. Which layout should this use? base or single?
    // 4. What view should you be rendering and in what part of the template?
    // Don't forget to call .render()!
    view : function(id) {
      if (this.gallery.length === 0)
        this.gallery.fetch();

      var thePhoto = this.gallery.get(id);
      app.useLayout("layouts/single").setViews({
        ".side-bar": new Tools.Views.Standard(),
        ".content" : new Photo.Views.Detail({
          model: thePhoto
        })
      }).render();
      
    }

  });

  return Router;

});
