# Backbone Events

## Why events?
* coupling events that don't need to know about each other
* maintain synchronicity in your app
* coupled architecture
## bind the views to the model. 
* binding usually happens on your initialize
* mixing in backbone events can be done by extending
* backbone objects itself has events mixin, so it can be used as a global events bus
* caution with naming events. namespace them
* `backbone.bind` has been deprecated onto 'on'
* you can pass context to your event as a third parameter.
* jquery style event binding, provide a hash object where event names are keys and functions the values.
## unbinding events 
important - use `.off()`. you can be specific with which callbacks to remove, provide a reference to callback. Important to provide named functions, rather than anonymous.
if you're going to be unbinding, save your functions on vars.
can be useful to bind an event with `.once()`, where once the callback fires once, it is removed.

##Inversion of control. 
`listenTo(model, 'event', callback)` - then `stopListening()`
if you have to manage many doors, you should use a collection

##Triggering events
`trigger('eventname', arg1, arg2, arg3)` -> args get turned into an array
if you don't pass arguments, function is given undefined
the context in listenTo callbacks is the listener object,.