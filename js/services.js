app.factory('sound', [function() {
  return function(id) {
    var src = [];
    for (var i in audioExtensions) {
      src.push(audioBaseURL + id + '.' + audioExtensions[i]);
    }
    
    return new Howl({
      src: src,
      html5: true,
    });
  }
}]);
