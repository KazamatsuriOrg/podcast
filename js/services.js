app.factory('sound', ['$q', function($q) {
  createjs.Sound.addEventListener('fileload', function(e) {
    var sound = createjs.Sound.createInstance(e.id);
    e.data.resolve(sound);
  });
  
  createjs.Sound.addEventListener('fileerror', function(e) {
    e.data.reject(e);
  });
  
  return function(id) {
    return $q(function(resolve, reject) {
      if (!createjs.Sound.loadComplete(id)) {
        var src = audioBaseURL + id + '.' + audioExtensions[0];
        createjs.Sound.registerSound(src, id, { resolve: resolve, reject: reject });
      } else {
        resolve(createjs.Sound.createInstance(id));
      }
    });
  };
}]);
