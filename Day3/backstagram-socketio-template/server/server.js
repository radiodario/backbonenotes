// Include and bind the Socket.io server to port 4200.
var io = require("socket.io").listen( process.env.NODE_ENV_PORT || 4200 );
// Store all images here.
var images = {};

// Whenever a socket is created, bind a unique event instance to it, this
// allows 1:1 communication with each connected client.
io.sockets.on("connection", function(socket) {
    console.log("io.sockets.on create");

    socket.on("read:photos", function(model, done) {

        // Turn all images into an array.
        var result = Object.keys(images).map(function(id) {
            return images[id];
        });

        return done(null, result);
    });

    // Get an image from the cache.
    socket.on("read:photo", function(model, done) {
        // Find the image based off the id.
        var image = images[model.id];

        if (image) {
            return done(null, image);
        }

        return done("No image found.");
    });

    // Create an image in the cache.
    socket.on("create:photo", function(model, done) {
        // Save the id.
        var id = Object.keys(images).length;

        // Set the id.
        model.id = id;

        // Set the model.
        images[id] = model;

        // Emit out to all clients.
        io.sockets.emit("new:photo", model);

        return done(null, model);
    });

    // delete an image
    socket.on("delete:photo", function(model, done) {
        
        delete images[model.id];
        // notify everyone should go read their photos!
        io.sockets.emit("read:photos");
    });

});