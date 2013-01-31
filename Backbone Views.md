# Backbone Views

## Updating Views
helps to turn things into components. Without views, loading and clearing logic are separate in code. The data you return from a simple ajax call isn't that reusable. Also, multiple actions are stuck on the same callback. 

## Creating Views
inside a view, we have an `$el`, usually referring to an element. There are two references to the element, one of them wrapped in jQuery. 

## What should be a view?
break down things into smaller units. Views are usually broken into smaller views. Sometimes views are useful to be broken down in smaller piecesl

i.e. a 'related video list', this would maybe have: 
* A `video` module (a module is a way of thinking about groups)
* that would have a `Views` property: `Video.Views`
* we'd need some models:
  * `Video.RelatedVideo` a model that contains a related video
  * `Video.RelatedVideos` a collection that contains videos


## Element
Created on initialisation. It doesn't exist on the browser, until you attach it. You can attach it to an existing element, by setting the `el` property. Don't set the `el` property to a jquery element. jQuery would try to evaluate and find the element usually before the dom is ready.

You might want to use an existing element when:
* it is an element you're only going to paint once.
* it is an element that contains other elements (i.e parent views).
* it is an element that you're going to be updating a lot.
* it is organizational and not really tied to data.

You might want to create new elements when:
* it is tied to a model/collection
* it is going to be painted in many places
* it is an element that's part of a list

These arent' rules but heuristics.

## Passing Data
you can bind models or collections to a view. 

## Dom Events
Pass an events object with DOM events as keys and view method handler names as values. The events property is to handle *DOM events only*. Try to handle things so that there aren't too many listeneres.
### Where to handle events
* if the event is *modifying the model or collection*, define it in the view that corresponds to the model or collection
* if the event is not modifying the model or collection, catch it on the parent, highest view you can.

## Rendering
The default render method just returns `this`. You should always return `this`. When spefiying a `tagName` property, it'll create a tag of the type you specify, otherwise it'll be a `div`.  If you attach to an existing element, then you don't need to attach or append.

## Templates
```js
var t = '<div><%= name %></div>'; // The equals sign means "i've going to have output."
_.template(t, { name : "joe"});
```
We can also compile the template into a function:
```js
var tp = _.template(t);
tp({ name : "joe" });
```
This is useful if we're calling the template later. This saves overhead as we only compile the tablet once.

Templates can be just strings, or maybe script tags:
```html
<script type="text/template" id="viewtemplate">
  <li>My name is <%= name %></li>
</script>
```
then it can just be made the template property of the view:
```js
Backbone.View.extend({
  template: _.template($('#viewtemplate').html())
})
```
this is dangerous because we're loading the template from the dom. 

They can also be loaded from the server:
```
app
  modules
    photo.js
  templates
    photo
      show.html
      list.html
```
we grab them by giving the template a template path.
on initialization, we build a path and try to build an ajax request for it. Build a dictionary on client-side with all templates on a global object.

## Auto Updating
You want to listen to changes in the data to keep your ui synchronized. 
i.e. 
```js
initialize: function() {
  this.listenTo(this.model, "change", this.render); // this will call render every time the model changes.
}
```
you might want to update rather than re-render, if your render function is costly.
if the view is attached, changing the el of that view, it'll already modify and thus there's no need to re-attach.

## Cleaning
you can define a `remove()` method, but you'll have to call the view's default `remove()` method:
```js
remove: function() {
  // cleanup code
   ... do something here
  // and then:
  return Backbone.View.prototype.remove.apply(this, arguments);
}
```
if you call `view.remove()` it'll unbind all events bound to it using `listenTo`


