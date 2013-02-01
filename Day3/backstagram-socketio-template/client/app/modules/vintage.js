define([],

// There are no dependencies above
function() {

  // Create a new module.
  var Vintage = {};

  Vintage.process = function(dataURL, callback) {
    // Create a placeholder image adn set its src to the dataURL.
    var placeholder = $("<img>").attr("src", dataURL);

    // Process with vintage.
    placeholder.vintage({
      callback: function() {
        if (_.isFunction(callback)) {
          callback(placeholder.attr("src"));
        }
      }
    });
  };

  // Return the module for AMD compliance.
  return Vintage;

});
