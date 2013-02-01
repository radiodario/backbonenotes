// ==== Nodes:
// The code you wrote in your Model and Collection challenges is available here.
// If you no longer have it, please grab it from this gist:
// https://gist.github.com/21ee7530856281e81960

// You can always change the contents of the "Visual Output" pane by referencing
// it using the 'viewer' variable!

// ==== Let's make a list of all the repos in our organization!

// Step 1: Define a backbone view called RepoListItem that represents a Repo model
// A RepoListItem is going to be a single repo list item inside of a list of repos
// the default type of element should be an "li" element.
var RepoListItem = Backbone.View.extend({
  tagName : "li"
});

// Step 2: Add a render method to the RepoListItem that will create a single
// <li> element with the repo name. 
RepoListItem.prototype.render = function() {
  this.$el.html(this.model.get("name"));
  return this;
};

// Step 3: Define a backbone view that is called RepoList that represents
// a list of repo models.
// The default tag type should be a "ul"
var RepoList = Backbone.View.extend({
  tagName : "ul"
});

// Step 4: Define a render method on the RepoList view that iterates over all
// the models in its collection and renders a RepoListItem for them. It should
// append them to the list's element.
RepoList.prototype.render = function() {
  var self = this;
  this.collection.each(function(model) {
    self.$el.append((new RepoListItem({ model : model })).render().$el);
  });
  return this;
};

// Now, you have an organization called document cloud. 
// THE REST OF THE TESTS NEED TO HAPPEN INSIDE THE CALLBACK!
var documentcloud = new Organization([], { org: "documentcloud" });
documentcloud.fetch().then(function() {

  // Step 5: create a new instance of your repo list called myRepos.
  // NOTE: You must work within the following fetch.
  var myRepos = new RepoList({ collection : documentcloud });

  viewer.html(myRepos.render().$el);

});