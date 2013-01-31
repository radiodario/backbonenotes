# Backbone Routers

the *star* of MV*. closest thing to a controller. Tied to URLs that the users navigate to. 
you can override the root url with `{ root: '/animals'}`
router hijacks url changes and tries to match urls to callback or delegate back to the server.

You create a router constructor and you just initialise it _once_. The most important part is the routes object.
Empty string is the `home` route. (the blank route). Similar to DOM events.

`Backbone.history.start()` allows backbone to track your url history, enabling the back/forward buttons.
This should be called after your router is initialised.

Unless `pushstate` is enabled, you need to add `#`

## Params
You can have params on your routes that are passed to your callback.
i.e.: `routes : {'user/:id' : 'handleId'}`
You can use splats to use a catchall:
i.e.: 'routes : {'user/*repo' : 'handleId'}`
`handleId` would receive everything after the user slash.

## Navigation
You can trigger a route manually by calling `router.navigate`. Behaves strangely. You give it a route, it'll change the URL, and then it'll do nothing by default unless you pass `{trigger: true}` as default

## Events
You can bind onto router events, such as 'route' or a particular route, i.e. 'route:about'. 

### You should make routes for:
* Behaviour that changes the current UI
### You shouldn't make routes for:
* actions that modify the state of your data on the server.

## Enabling Bookmarkeable urls
If you enable `pushState`, you need to prepare your server to handle those, otherwise bookmarked url's will hit the server. 
A user could come into any of your pushState urls. Every single route you have needs to have everything required.

## Bootstrapping
Define an `initialize` method on your router to bootstrap all the data you'll require. This gives you a guarantee that things will be available when the user route hits. 
Render all the required layout everytime. This can be done on `initialize` or alternatively, if you have Backbone Boilerplate, on `useLayout`

## Start
Call this after you initialize your routers. this will also fire your initial route. You can also override the root of your application.

## Hash
you can access your hash url on `location.hash`
