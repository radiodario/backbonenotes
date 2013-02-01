# Backbone Testing

Test-Driven JavaScript Development by Christian Johansen. Good book because he does TDD throughout the book. 

## Why Test?
* Document your work
  * Testing is technically informed documentation.
  * If you're good about running your tests regularly, your 'docs' will always be up to date
* Give legitimacy to your open source code 
  * If there are loads of tests, then it's a 'trustable' repo
* Promote modular design - if you can't test it, it's too big
  * By testing, you usually organise your code in smaller, more mantainable modules
* Prevent regressions
* Maintain a scaffolding for re-factoring
  * If you have a nice test suite, you can change things around with the confidence that if your tests run, then everything is good.

## Libraries
Compare and contrast to see the pattern on testing. 

Common structures:
* Expectations
* Organization
* Setup and teardown
* Stubbing
* Asynch harnesses.

## Syntax
### Expectations
QUnit uses assertions, jasmine uses matchers. Assertions provided by QUnit are really barebones, whereas Jasmine looks more like english. 
QUnit's third argument to assertions are strings that will explain what went wrong.
### Organization
QUnit gives you modules, jasmine gives you `describe` blocks.
Jasmine is better for this because you can do nesting. i.e.
```js
describe("dances", function() {
  describe("charleston" function() {
    // etc
  })
})
```
### Setup & Teardown
two ways to organize setup. Jasmine's nesting `describes` are useful if you want to share some of the setup/teardown code. 

### Stubbing
Testing things that are indeterminant and are difficult to test. Stub out (i.e switch out) another function so that its dependants can become testable.
With QUnit, you store the indeterminent method as an internal variable, test the dependent functions, then re-assign the method to its original value.
With Jasmine, you use spies i.e. `spyOn(Batman, "isAvailable").andReturn(true)`
Adding stubbing makes thing a bit less of a unit test, and more of a functional test, since it involves two parts of the code. Sinon.js is very useful

### Async
Async code requires special care. QUnit has `stop()` and `start()`. You call start and it makes it wait until start is called.
Jasmine uses `waitsFor()` and `runs()`. 

## Testing Tests
JQuery uses QUnit to test itself check them out.

## Advanced Use Cases
### Testing with require.js
* wrap your test files in define modules
* require all your test modules

### Override Backbone Sync
Helps fake a response to be data you expect.
i.e.
```js
var oldSync = Backbone.sync;
Backbone.sync = function(method, model, options) {
  options.success({... some fixture data ...});
};
```

### Testing Views
this is tricky:
* Views are volatile
* They're almost integration tests. 
* Presentation details are tricky to test accross browsers.

try to test things like initializing and rendering by surrounding them with a `try-catch` and set flags that you ten test. This doesn't have anything to do with what is actually rendered, but it catches errors!
i.e. if you have a template:
```html
<h1><%= make %></h1>
<h2><%= model %></h2>
```
Even if it is this simple, it requires the model to have a `make` and a `model` attributes. Testing Defaults is usually a good idea.

Procedurally generated tests. The more clever you get with your tests, the more things can go wrong.

## Testing Pitfalls
Make sure your test tests *your* code, not the libraries you're using!
Always try to group your logic. Also, Testing for default values is kinda useless. 
Be verbose about the functions you're testing. 
When testing events, they are a bit of a red herring. Group tests together that test how things inter-operate. If an event is conditionally fired, there's some logic you should be testing there.

Zombie.js
Phantom.js


