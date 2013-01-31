// Test 1: 
// create an object literal named animal with a property
// called spoke set to 0

var animal = { spoke : 0 };

// Test 2: 
// Create an object literal named dog with a property
// called barked set to zero

var dog = { barked : 0 };

// Test 3:
// Mix in Backbone.Events
_.extend(animal, Backbone.Events);
_.extend(dog, Backbone.Events);

// Test 4:
// create a function called bark that increments the 
// dog barked count. Log to the console "woof" for every bark

window.bark = function() {
  dog.barked += 1;
  console.log("Woof!");
};

// Test 5:
// On the dog object, bind an event called "barking" that takes an 
// numberOfTimes parameter that calls the barked method an appropriate 
// number of times. When done barking, within the callback, trigger the 
// barking:done event on the dog object

dog.on("barking", function(numberOfTimes) {
  for (var i = 0; i < numberOfTimes; i++) {
    window.bark();
  }
  dog.trigger("barking:done");
});

// Test 6:
// Bind on the dog object, to the "barking:done" event and fire
// a "speaking" event on the global Backbone object.

dog.on("barking:done", function() {
  Backbone.trigger("speaking");
});

// Test 7
// Tell the animal object to listen to the Backbone object's
// "speaking" event and increment its 'spoke' property.
// log to the console that an animal has spoken.
// If the spoke property is greater or equal to 5, publish
// the "quiet" event on the Backbone object.

animal.listenTo(Backbone, "speaking", function() {
  console.log("An animal has spoken!");
  animal.spoke += 1;
  if (animal.spoke >= 5) {
    Backbone.trigger("quiet");
  }
});

// Test 8
// create a functionc called onQuiet that resets the 
// dog's barked count and the animal's spoke properties back
// to zero. It should also log to the console "Quiet!"
// Bind that callback to Backbone's quiet event but only once.

var onQuiet = function() {
  dog.barked = 0;
  animal.spoke = 0;
  console.log("Quiet!");
};
Backbone.once("quiet", onQuiet);

// Make the dog bark 3 times, 5 times.
for(var i = 0; i < 5; i++) {
  dog.trigger("barking", 3);
}  

// Test 9
// add an event called "clear" to Backbone that removes all
// listeners from the dog, animal, and Backbone object.
// Don't trigger the clear event.
Backbone.on("clear", function() {
  animal.stopListening();
  dog.off("barking");
  dog.off("barking:done");
  Backbone.off("quiet");
  Backbone.off("clear");
});