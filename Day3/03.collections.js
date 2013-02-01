// Code from the Model section is available here, make sure those tests are
// passing first!

// Step 0: Define a new model called PrivateRepo is a subclass of Repo. The only difference
// is that the defaults private property is set to true.
var PrivateRepo = Repo.extend({
  defaults : {
    "private" : true 
  }
});

// Step 1: Define a Backbone.Collection called Organization.

var Organization = Backbone.Collection.extend({

  // Step 2: Set the Model property to Repo.
  model : Repo,

  // Step 3: Create an initialize function that sets an org instance property to
  // options.org (if options exists).
  initialize : function(models, options) {
    options = options || {};
    if (options.org) {
      this.org = options.org;
    }
  },

  // Step 4: Set the URL to the following format:
  // https://api.github.com/orgs/:org/repos?callback=?
  // You can assume that you can access this.org!
  url : function() {
    return "https://api.github.com/orgs/" + this.org + "/repos?callback=?";
  },

  // Step 5: Create a parse function to return the response's data property
  parse : function(data) {
    return data.data;  
  },

});

var favorite, filtered;

// Step 6: Create a new instance of the Collection called documentcloud with
// the org option set to "documentcloud".
var documentcloud = new Organization([], { org: "documentcloud" });

// Step 7: Fetch the collection with the sync option set to true
// THE REST OF THE TESTS NEED TO HAPPEN INSIDE THE CALLBACK!
documentcloud.fetch({ sync : true} ).then(function() {
  
  // Step 8: Create a new type of collection called FavoriteRepos. It should
  // inherit from the Organization collection except that its model should 
  // return either a PrivateRepo or a Repo based on the "private flag"
  var FavoriteRepos = Organization.extend({
    model : function(attrs, options) {
      if (attrs["private"] === true) {
        return new PrivateRepo(attrs, options);
      } else {
        return new Repo(attrs, options);
      }
    }
  });
  
  // Step 8: make the favorite collection to be a new FavoriteRepos collection 
  // that has the same models as the documentcloud collection.
  favorite = new FavoriteRepos(documentcloud.models);
  
  // Step 9: set filtered to be a subset of the repos inside favorite whose 'name' 
  // property is not equal to backbone or underscore.
  filtered = favorite.filter(function(model) {
    if (model.get("name") !== "underscore" && model.get("name") !== "backbone") {
      return false;
    } else {
      return true;
    }
  });
  
  // Step 11: Add a new PrivateRepo into the collection with at least the
  // following attributes:
  // { id: 9, master_repo: "master", git_url: "git://secret@private.com", "private" : true }
  favorite.add({ 
    id: 9, 
    master_repo: "master", 
    git_url: "git://secret@private.com", 
    "private" : true 
  });
});