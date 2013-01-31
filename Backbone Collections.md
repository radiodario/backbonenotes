# Collections
collections are bunches of models. we build constructors and then instantiate them. Use capital letters for constructors.

## The Extend Method
```js
var Task = Backbone.Model.extend({});

var PriorityTask = Task.extend({ 
alert: function() {console.log('alert')}
});

Task.prototype.complete = function () {
  console.log('complete')
}
```
if you alter the prototype of an extended object, all the objects that extend that object will inherit those new methods/properties


## Models
collections have a model type specified:
```js
var Task = Backbone.Model.extend({});
var Tasks = Backbone.Collection.extend({
  model : Task 
});
```

to have polymorphism you can turn the model property into a function:
```js
model: function(attrs,options) {
  if (attrs.type === "book")
    return new Book(attrs, options)
  if (attrs.type === "magazine")
    return new Magazine(attrs, options)
  return Backbone.Model(attrs, options);
}
```

## filling collections
a collection can be initialised with a collection:
```js
t1 = new Task()
t2 = new Task()
tasks = new Tasks([t1, t2])
```
also they can be added with `.add({ modelobject data })` and backbone will create a new instance of the model you specified on the constructor
if you pass an array of model data jsons, it'll create them all! i.e `.add([{a:1},{a:2}])` will add two models to the collection
collections can be reset also.

You can pass `{at:index}` to insert a model at a given index, and if you use `{ merge:true }` then it'll merge the object properties with anything that is there

```
var t1 = new Task();
var t2 = new Task();
var t3 = new Task();
var t4 = new Task();
tasks.reset([t1, t2, t3, t4]);
```

## bootstraping
It's a good idea to bootstrap data on the page that you might use everytime.
```html
<script id="data" type="application/json">
[
{ "id" : 1, "name" : "greg"},
{ "id" : 2, "name" : "fran"}
]
</script>
```
you can then parse the contents of that `#data` tag i.e. `JSON.parse($('#data').html())`

## fetching
Common operation. collections have a `.fetch()` function that will expect an array of objects from the server, and takes a url, and has the same functionality as model (i.e. events, callbacks). Fetching resets the collection unless you set `{add:true}` as the flag to fetch

## Updating
new feature. The `update()` function will add any new models, remove any you don't specify and change the ones you pass if there are any changes to them.
you can specify 
```js
{ add    : true | false }
{ remove : true | false }
{ merge  : true | false } // useful when the models change often.
```

## Sorting
the `.comparator()` function will take one single parameter and it's your responsability to return a numeric value which will define the order. Sorting happens everytime you add a new model, so be wary if you're adding a lot of things to it.
Sorting can be disabled by passing a flag '{sort:false}' and that way it won't do any sorting. You can then trigger it manually by calling the `.sort()` method manually.


## Filtering
Originally an underscore method, `.filter()` takes a callback that should return true/false to indicate whether a model should be included
```js
myEvenCollection = myTasks.filter(function(task) { return task.get('p') == 0});
```
*heads up!* myEvenCollection is not a collection but an array. 

`.where()` is like filter but just checks on equality with property

## Nesting
collections and models can be nested. You should have API points for all your models, but you should have a way to download all of the data you need with as few requests as you can!
you can save nested things as attributes in ways that make sense!

## Events
interesting bubbling action. collections have events such as `add`, `remove`, `reset`, `sort`. Model events bubble up to collections.
```js
mTasks.on('add', function(model) {
  console.log('added', model.get('p'));
});
```
When a model's event fires, the event bubbles up to the collection. this doesn't happen in the other direction.
```js
myTasks.on('change', function(model) { ... })
```

A model will keep a reference to the last collection you add it to. if a model belongs to more than one collection, it'll only keep a reference to the last one.
the callbacks for events are stored on an `_events` object inside the model. if you remove an event callback, the entry on the `_events` object will remain there, but contain an empty array. this can be a bit leaky. 

A collection also have a `parse()` function, which expects an array.

