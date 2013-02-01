Backbone.sync = function(method, model, options) {
  
  var cache = {}; // make this persist
  var counter = 0;  // keep count for ids
  // closed to the scope of this function. 

  // this function has access to cache
  return function(method, model, options) {

    // deferred object respect. ALWAYS DO IT
    var deferred = $.Deferred();

    // handle methods
    if (method === "create") {
      // assign an id
      model.id = counter;
      // increment the counter
      counter += 1;
      // now save it
      cache[model.id] = model;

      // call our success callback. 
      // We need to pass it some data.
      // backbone passes (model, response, options) to the success callback
      options.success(model, model.toJSON(), options);

      // wer'e not calling options.error because there won't be an error.

      // all we gotta do is resolve the deferred
      deffered.resolve();
    } else if (method === "read") {
      if (cache[model.id]) {
        options.success(cache[model.id], model.toJSON(), options);
        deferred.resolve(model);
      } else {
        options.error(model, "Model not found");
        deferred.reject(model);
      }
    } else if (method === "update") {
      if (cache[model.id]) {
        cache[model.id] = model;
        options.success(model, model.toJSON(), options);
        deferred.resolve(model);
      } else {
        options.error(model, "Model not found");
        deferred.reject(model);
      }
    } else if (method === "patch") {
      if (cache[model.id]) {
        _.extend(cache[model.id].attributes, model.attributes);
        options.success(cache[model.id], cache[model.id].toJSON(), options)
        deferred.resolve(model)
      } else {
        options.error(model, "Model not found");
        deferred.reject(model);
      }
    } else if (method === "delete") {
      if (cache[model.id]) {
        delete cache[model.id];
        options
      } else {
        options.error(model, "Model not found");
        deferred.reject(model);
      }
    }

    // we return a promise, so that methods can chain callbacks to it
    return deferred.promise();

  };

}(); // run it right away