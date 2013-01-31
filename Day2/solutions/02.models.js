// Step 1: Define a Backbone.Model named Repo.
var Repo = Backbone.Model.extend({});

// Step 2: Set the following defaults.
// { private: false, fork: false, master_branch: "master" }
Repo.prototype.defaults = {
  "private" : false,
  fork : false,
  master_branch : "master"
};

// Step 3: Create a url that fetches the following format:
// https://api.github.com/repos/:user/:repo?callback=?
Repo.prototype.url = function() {
  return "https://api.github.com/repos/" + this.get('user') + "/" + this.get('repo') + "?callback=?";
};

// Step 4: Configure validation to fail if git_url, or
// master_branch are not valid properties or are blank.
Repo.prototype.validate = function(attrs, options) {
  if (typeof attrs.git_url === "undefined" || 
      attrs.git_url === "") {
    return "No git_url defined";
  }
  if (typeof attrs.master_branch === "undefined" ||
      attrs.master_branch === "") {
    return "No master_branch defined";
  }
};

// Step 5: Create a parse method to return the resp.data.
Repo.prototype.parse = function(resp) {
  return resp.data;
};

// Step 6: Create a new Repo named backbone and set the options to:
// user: documentcloud, repo: backbone.
var backbone = new Repo({
  user: "documentcloud",
  repo: "backbone"
});

// Step 7: Fetch the Repo, continue the rest of the challenge inside the
// success callback.
backbone.fetch({
  success : function(model, response, options) {
    app.trigger("done", model.id);
  }
});

// Step 8: Trigger the done event on the global app variable with the id value
// from backbone.