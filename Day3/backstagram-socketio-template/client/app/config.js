// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["../vendor/jam/require.config", "main"],

  paths: {
    // JavaScript folders.
    plugins: "../vendor/js/plugins",
    vendor: "../vendor",
  },

  shim: {
    // Backbone depends on lodash and jQuery, exports the global Backbone
    // object.
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },

    // Twitter Bootstrap depends on jQuery.
    "vendor/bootstrap/js/bootstrap": ["jquery"],

    // VintageJS depends on jQuery.
    "vendor/js/libs/vintageJS/src/vintage": ["jquery"],

    // // Backbone.LayoutManager depends on Backbone.
    // "plugins/backbone.layoutmanager": ["backbone"],

    // // Backbone.localStorage depends on Backbone.
    // "plugins/backbone.localStorage": ["backbone"]
  }

});
