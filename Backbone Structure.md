# Backbone Structure

There are certain higher level concerns with these kinds of applications:
We need to arrange our filesystem. How do we segment our code into different parts? 
We can use `require.js` to *define* and *require* models.

## Using Grunt and JamJS with BBB

## Configuring
Two places where you can configure Boilerplate:
* `app/config.js` for your modules and third party javascript
* `grunt.js` building

### `app.js`
backbone layoutmanager can augment your views and helps you specify where your templates live. 

RequireJS's returned objects are what it is exposed by the model, and have a `module` and `useLayout`

you usually don't modify your `app.js` 

### `router.js`
returns a Router constructor.

### `main.js`
starts things up

### `configure.js`
sets the require.js configuration for your app. 


## Namespacing
## Modules
* a single model for component
* a single collection holding mutiple models
* various views to show the model/collection

## Defining
allows to create a module. 
create a new module by calling `app.module()`, define things inside that module, and then return it.

## Requiring

## Stylesheets

## Template Compilation
