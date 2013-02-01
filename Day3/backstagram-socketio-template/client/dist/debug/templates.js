this["JST"] = this["JST"] || {};

this["JST"]["app/templates/layouts/base.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="layout base">\n  <div class="container-fluid">\n    <div class="row-fluid"><div class="span12"></div></div>\n\n    <!-- Header content. -->\n    <div class="row-fluid">\n      <!-- Left gap. -->\n      <div class="span1"></div>\n\n      <!-- Show logo. -->\n      <div class="span10">\n        <h1 class="logo"><a href="#">backstagram</a></h1>\n        <hr>\n      </div>\n\n      <!-- Right gap. -->\n      <div class="span1"></div>\n    </div>\n\n    <!-- Main content. -->\n    <div class="row-fluid">\n      <!-- Left gap. -->\n      <div class="span1"></div>\n\n      <!-- Left hand - central content. -->\n      <div class="span7">\n        <!-- Show main content here. -->\n        <div class="content"></div>\n      </div>\n\n      <!-- Used for side-bar tools and controls. -->\n      <div class="span3 side-bar"></div>\n\n      <!-- Right gap. -->\n      <div class="span1"></div>\n    </div>\n  </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/layouts/single.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="layout single">\n  <div class="container-fluid">\n    <div class="row-fluid"><div class="span12"></div></div>\n\n    <!-- Header content. -->\n    <div class="row-fluid">\n      <!-- Left gap. -->\n      <div class="span1"></div>\n\n      <!-- Show logo. -->\n      <div class="span10">\n        <h1 class="logo"><a href="#">backstagram</a></h1>\n        <hr>\n      </div>\n\n      <!-- Right gap. -->\n      <div class="span1"></div>\n    </div>\n\n    <!-- Main content. -->\n    <div class="row-fluid">\n      <!-- Left hand - central content. -->\n      <div class="span12">\n        <!-- Show main content here. -->\n        <div class="content"></div>\n      </div>\n    </div>\n  </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/photo/detail.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="detail">\n  <img src="'+
( photo.get("data") )+
'">\n  <div class="delete"> <button class="btn">delete photo</button> </div>\n</div>\n\n';
}
return __p;
};

this["JST"]["app/templates/photo/gallery.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
 if (!gallery.length) { 
;__p+='\n<h3>No photos found.</h3>\n';
 } else { 
;__p+='\n\n<ul class="thumbnails">\n  ';
 gallery.each(function(thumbnail) { 
;__p+='\n  <li class="span3">\n    <a href="#photo/'+
( thumbnail.id )+
'" class="thumbnail">\n      <img src="'+
( thumbnail.get("data") )+
'" alt="">\n    </a>\n  </li>\n  ';
 }); 
;__p+='\n</ul>\n\n';
 } 
;__p+='\n';
}
return __p;
};

this["JST"]["app/templates/photo/take.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<video autoplay></video>\n<canvas></canvas>\n';
}
return __p;
};

this["JST"]["app/templates/photo/upload.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<input accept="image/*" type="file" class="btn js-btn">\n<canvas></canvas>\n';
}
return __p;
};

this["JST"]["app/templates/tools/capture.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="toolbar">\n  <button class="btn btn-invert">take photo</button>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/tools/standard.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="toolbar">\n  <a class="btn js-btn" href="#take">Webcam</a>\n  <a class="btn js-btn" href="#upload">upload</a>\n</div>\n';
}
return __p;
};