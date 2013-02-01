# Backbone Realtime

## Backbone.sync 
Understanding how backbone.sync works is very useful. API servers are never 100% perfect. `Backbone.sync` is global and other calls are just proxies to it.
* `method` can be any of CRUD, i.e `CREATE`, `READ`, `DELETE`, `UPDATE` and these are called by i.e. fetch with `READ`, etc.
* `model` (or `collection`)
* `options` have the i.e. `success()` or `error()` options.

Sync is called usually from `fetch()` or `create()`. Sync is a proxy to an `$.ajax` request that attaches sucess and error callbacks to that `$.ajax` request.

When overriding, you don't need to override the global sync. Yould override sync on a particular object

It's good practise to save a reference to the original `Backbone.sync` in case you want to reach out and use the old `sync`, say if you wanted to rely on it as a fallback. 

Usually methods that interface with sync, take your success callback and doing something in the middle and then call `.sync()`

## Websockets
HTTP has a number of drawbacks:
* it's unidirectional, you have to *ask* for the content
* it's Half-duplex :(
* Costly, there are loads of headers!
* Polling: high latency.
* Long polling leaves a request hanging, which can time out, causing too many requests.
Websockets!
* full duplex
* bidirectional - client or server can send, you can just subscribe to a channel, and go!

## Socket.io
1. Include socket.io from your server:
  ```html
  <script src="http://yourserver:4000/socket.io/socket.io.js"></script>
  ```
  This shouldn't be included on the client, so that the server can choose what to send you:
2. Initialize a connection on your app namespace on your clientside:
  ```js
  app.socket = io.connect('ws://yourserver:4000')
  ```

### Integrating into Backbone.
* Override `Backbone.sync`
* Listen to events and update existing `Models` or `Collections`
Socket.io can be used as an event buffer, stretched out accross a load of clients!

### Server
You can use socket.io for persistence, as long as you set it up for persistence. Respond with a callback to the 'create' event, and provide handlers for CRUD events. 

### Patching
Always check for the first argument to socket.io emit's `done` callback to see if it is an error!

### Implementation
The way in which we patched sync means that we can just add a `realtime = true` flag to a model or collection 

### Push
We can push from the serer to the client by adding a listener to a `new` event. The listener might be on a high level entity such as the `router`. You can initialize it in the router, put it in the `main.js` or the `app` object, i.e. somewhere high level in your app. 



