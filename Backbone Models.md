Backbone Models
---------------

'row' or 'document' of a data store.
provides:
* manipulation
* rest operation
* validation
evented arch.
never rely on client-side validation alone. client-side val is more to inform the user than to verify the integrity of the data.

Model properties
_changing set to true while the model is changing
never access or change the attributes directly, as events won't fire
defaults save some calls to 'set', 
defaults with arrays aren't copied, so all instances of a model will point to the same array. Never use anything that isn't a native. 
if you want arrays, make defaults be a function that returns your defaults. i.e.

```js
defaults: function() {
 return {
   ref: []
   }
};
```

things that don't need to persist, they don't really need to go as attributes of models. If you need to rely on events, then do put them in attributes.

## Validation

define a validate function, which takes attributes and options. You don't have a refrence to ```this``` inside the validate function. This is because you don't wanna save attributes that can't be validated!
If it's wrong, return something. Only happens before save call, but if you pass ```{validate:true}``` to ```set``` it'll do it.
There's an ```invalid``` event:

```js
larry.on('invalid', function(model, msg) {
  console.log(msg);
});
```

[catalog of built-in events](http://backbonejs.org/#Events-catalog).

### error vs invalid events:
if **client side** validation fails, you get an ```invalid``` event
if your **server side** ```save``` call fails, you get an ```error```

## identifying models
**cid** used internally before model is saved
* assigned by default
* not persistent 
* not guaranteed consistency between sessions
**id** 
* doesn't exist by default
* assigned by the server
you cannot get the ```cid``` attribute with ```model.get('cid')```, it'll always return undefined
you can tell backbone to use a different id attribute by specifying the ```idAtribute``` property. It'll mantain the 'task.id' property, but it getting it, you have to use the original property. Only call ```.id``` and ```.cid``` directly.

## Server binding
There are mappings from REST verbs to backbone functions
```model.save()``` --> POST, PUT
```model.destroy()``` --> DELETE
```model.fetch()``` --> GET
Models can have a `url` property which can be static or a function. pretty common to override
`urlRoot` property is preppended to url.

## Fetching
You could use callbacks:
It's an async method. you can use `success` or `error` properties, by providing them to the `fetch()` function.
You could use deferreds:
### deferreds:
object that returns a 'promise', a state control function. many callbacks can be attached. Different places can different bindings to the same object. 

```js
var d = $.Deferred()
// attach some 'promises'
// Cannot guarantee the order in which the promises will happen.
d.then(function() {
  console.log('success!')
})
d.then(function() {
  console.log('another success')
})

// what to do do if we fail
d.fail(function() {
  console.log('oops')
})

// resolve the promise
d.resolve()

// or resolve with a parameter
d.resolveWith(someParam)
```

In backbone, `model.fetch()` returns a promise to which you can attach success or fail calbacks also
you can use the `$.when()` function to synchronise several promises, i.e:

```js
$.when(promise, promise2, function() { ... })
```

## Handling fetch/save errors.
Important to handle HTTP Status Codes. Good error communication (i.e. sending a 404 when a resource doesn't exist) can save time and make things more elegant.
* `1XX` Informational
* `2XX` Success
* `3XX` Redir
* `4XX` Client fail
* `5XX` Server fail

## Persisting
if you're updating a model, when .save() you can use PATCH

## Data Parsing
define a custom `parse` method taht takes the whole response body, and return the object you want your model to be built from. i.e. flatten the object or do some sort of rebuilding or parsing

## Destroying a model
destroyed models will still retain the id

## Events
most common event is `change`. On a callback to a `change` event, you have the following useful methods:
`model.changedAttributes()` -> returns only the attributes that changed
`model.previousAttributes()` -> returns all the previous attributes
`model.previous('attrName')` -> just the previous you want.
`change` can be namespaced so that it only fires on the property you like, i.e. `change:name`

a `change` event will fire upon `.fetch()`, but it's nicer to use promises
a `destroy` event will be fired upon a call to `.destroy()`. You can set a `{wait:true}` flag so that destroy event is not fired right away but when the server responds.

if you do `model.set({a:'val'}, {silent:true})` the `change` event won't be fired. this silent object can be passed to almost everything that will fire an event

## Event flow
```
        -> change   ->
request -> destroy  -> sync
        -> error    -|
```
helps with user interaction, i.e. on request show a spinner, on sync we're done, remove spinner, etc.



