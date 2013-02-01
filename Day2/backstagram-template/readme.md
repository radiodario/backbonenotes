backstagram
===========

Created by Tim Branyen & Irene Ros for Bocoup's Backbone.js Training.

## Overview ##

A demonstration that illustrates developing an event-driven web application
using Backbone.js and friends.  The application displays a grid of images
that have been uploaded to the server and provides a tool mechanism to take
photos using the native webcam or from the filesystem.

## Getting started ##

To install and get backstagram running, you will need two open source
technologies:

* [Node.js](http://nodejs.org)
* [grunt-bbb](http://github.com/backbone-boilerplate/grunt-bbb)

Once these are installed, clone or download the repository and change directory
into it.  From there, run the `bbb server` command to get the server running.

Navigate to: [http://localhost:8000](http://localhost:8000)

## Mockups ##

Click on thumbnails for full sized mockups.

[![Home](https://github.com/tbranyen/backstagram/raw/assets/mockups/thumbnails/home.jpg)](https://github.com/tbranyen/backstagram/raw/assets/mockups/full/home.jpg)
[![Detail](https://github.com/tbranyen/backstagram/raw/assets/mockups/thumbnails/detail.jpg)](https://github.com/tbranyen/backstagram/raw/assets/mockups/full/detail.jpg)
[![Capture](https://github.com/tbranyen/backstagram/raw/assets/mockups/thumbnails/capture.jpg)](https://github.com/tbranyen/backstagram/raw/assets/mockups/full/capture.jpg)
[![Upload](https://github.com/tbranyen/backstagram/raw/assets/mockups/thumbnails/upload.jpg)](https://github.com/tbranyen/backstagram/raw/assets/mockups/full/upload.jpg)

## Screenshots ##

Click on thumbnails for full sized screenshots.

[![Home](https://github.com/tbranyen/backstagram/raw/assets/screenshots/thumbnails/home.jpg)](https://github.com/tbranyen/backstagram/raw/assets/screenshots/full/home.jpg)
[![Detail](https://github.com/tbranyen/backstagram/raw/assets/screenshots/thumbnails/detail.jpg)](https://github.com/tbranyen/backstagram/raw/assets/screenshots/full/detail.jpg)
[![Capture](https://github.com/tbranyen/backstagram/raw/assets/screenshots/thumbnails/capture.jpg)](https://github.com/tbranyen/backstagram/raw/assets/screenshots/full/capture.jpg)
[![Upload](https://github.com/tbranyen/backstagram/raw/assets/screenshots/thumbnails/upload.jpg)](https://github.com/tbranyen/backstagram/raw/assets/screenshots/full/upload.jpg)

## Architecture ##

Bocoup is all about open web technology and you should too! There is no reason
why you can't be leveraging existing libraries that are open source to complete
tasks in your web applications.

### Development stack ###

This application heavily borrows from the knowledge of great internet minds to
expedite the development process.  Backbone.js is not an end-to-end solution
for building any sized web application, therefore other libraries will be
required.

Below lists out all the libraries I've used in making this application:

#### Libs/ ####

[navigator.getUserMedia](https://github.com/rwldrn/navigator.getusermedia)

Used to normalize between Chrome and Opera for HTML5 WebRTC webcam support.

#### Plugins/ ####

[LayoutManager](https://github.com/tbranyen/backbone.layoutmanager)

Used to create layouts and views within Backbone.js that allows for a more
declarative approach when structuring the presentation layer.  This handles the
template fetching and rendering and general View management.

[localStorage](https://github.com/jeromegn/Backbone.localStorage)

Used to store the `Gallery` collection locally to avoid needing a remote
server.

#### Vendor/ ####

[Twitter Bootstrap](https://github.com/twitter/bootstrap)

Used to quickly style the application. Even though Twitter Bootstrap is
overkill for this project and between the base and responsive CSS account for a
large portion of the file size, this is a popular project and its useful to see
how to integrate it properly.

[vintageJS](https://github.com/rendro/vintageJS)

Used to create the **fun** "instagram"-like photo effect.

### Presentation ###

Textures via [SubtlePatterns](http://subtlepatterns.com/)

## Modules ##

The application is constructed through three very different modules.  `Photo`
and `Tools` contain Backbone.js specific constructors that are used for Models,
Collections, and Views.  The third module: `Vintage` is used to process the
image with a *vintage* look.

### Photo ###

The `Photo` module is used specifically to handle anything related to single
or multiple photos.

#### Models ####

The only model present in this module is `Photo.Model`, which is empty.  This
constructor is for future proofing the application if photos end up needing
additional functionality.

#### Collections ####

The `Photo.Collection` collection is set up to use the localStorage plugin to
persist models locally.  It is initialized in the main Router which then
updates the collection throughout the routes.  This collection powers the
`Photo.Views.Gallery` view and is used whenever a new photo is added.

#### Views ####

`Photo.Views.Gallery` is a view that displays the collection of photos.
Whenever the `Photo.Collection` collection is updated, this View automatically
updates.

`Photo.Views.Take` is the most complicated view.  It creates a `<video/>` and
`<canvas/>` tag to monitor the webcam and snap a photo when the **take photo**
button is pressed.  The `dataURL` is processed by vintageJS and then saved into
the `Photo.Collection`.

`Photo.Views.Upload` is less complex than `Photo.Views.Take`.  It allows a user
to upload a photo file from their harddrive and apply the same vintageJS effect
to it.

`Photo.Views.Detail` displays a single photo.

### Tools ###

The `Tools` module is used to display the controls views on the right hand
side of the application.

#### Views ####

`Tools.Views.Standard` displays the standard toolbar which contains buttons for
using the webcam or uploading from the harddrive.

`Tools.Views.Capture` not only displays a different template for the webcam to
snap a photo, but triggers a global `photo:capture` event when the **take
photo** button is clicked.

### Vintage ###

Takes in a `dataURL` and processes it with the vintageJS plugin that only works
on images.  Once the image is done processing, it triggers the callback with
the processed image data.

This does not use any Backbone specific code and is set up this way to show how
you can use modules for just about anything to help code re-use.

## Layouts ##

There are two layouts in the application.  The first displays a main content
area with a left sidebar used for the controls.  The second is similar to the
first, but does not have a side bar.

These layouts exist in the `app/templates/layouts` directory and are referenced
throughout the routes.  There is a very special `app.router.useLayout` method
that is used inside the Router that allows each route to have a specific layout
tied to it.

The `useLayout` function simply swaps out layouts in the application by name.
If a layout is re-used (ie the same one between routes) it will not recreate.

## Routes ##

The application is designed to work seamlessly between hash and pushState urls.

There are four routes to correspond to the four screenshots above.  These
routes are:

* **"index"** - This route puts the standard toolbar and the photo gallery into
  the base layout and fetches the photo's collection.

* **"take"** - Displays the capture toolbar and the photo take view into the
  base layout.

* **"upload"** - Uses the single layout instead of base and displays the photo
  upload view inside it.

* **"photo"** - Also uses the single layout and displays the specific photo
  based off the parameter using the photo detail view.
