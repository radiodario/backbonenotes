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
** `Video.RelatedVideo` a model that contains a related video
** `Video.RelatedVideos` a collection that contains videos


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
* 


