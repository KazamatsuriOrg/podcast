app.factory('sound', ['$q', function($q) {
  var bestType = playerPickFormat(audioTypes);
  var baseURL = audioBaseURL;
  
  return function(id) {
    return $q(function(resolve, reject) {
      var url = playerURLFor(id, baseURL, bestType);
      var audio = new Audio(url);
      audio.addEventListener('canplay', function(e) {
        resolve(audio);
      });
      audio.addEventListener('error', function(e) {
        reject(audio);
      });
    });
  };
}]);
