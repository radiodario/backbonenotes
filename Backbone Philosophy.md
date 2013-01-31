# Backbone Philosophy

## underscore
when using bind, you should store functions you bind in a variable.
extended objects have no inheritance..
Use extend to merge options, properties, etc.

##backbone
look at the commit history as much as you can
4 answers, all correct
Useful libraries
backbone.io
backbone.marionette
backbone.localStorage
$(element).focus()
$(element).live()

##provides class inheritance
event system -> manage application, on the data layer. some objects don't need access to the object. i.e. a photo can belong to a load of ui elements, but it doesn't need to know about them.
history management -> use route to navigate + push state to avoid hitting the server all the time

## where does backbone fit?
server -> security, business logic, don't expose your db!
backbone -> core structure, organisational layer 
hthml/css -> styling, design
backbone is minimal
new functionality is discouraged in the core library
no controllers are provided, only routers
no view management is provided, has to be done manually, event cleanup 
backbone events

non-traditional MVC -> called MV(star)

##Inheritance:
surrogate prototype.
class properties -> second argument to extend, these properties live directly on the model. 
Instance functions refer to instance itself (i.e. using this)
Class functions are attached to the method, 'this' scope isn't the model, but the model generating function, i.e. the constructor.
Model (properties, options)

## Rest:
url verbs correspond with the data
get, post, put, delete

# Modularity
Encourage modularity on a semantic level, i.e. all things to do with photos
require.js

# Events:
Data changes
maintain state, 
communication between modules
never require more than you need on your model, whilst still allowing for communication.
error handling
sync event?
allows for mixing into other object, they don't need to be backbone models.

# Overriding:
very little private scope, things can be overridden.
always keep a local copy of the original override
try not to override core fuctionality, when possible, subclass.
