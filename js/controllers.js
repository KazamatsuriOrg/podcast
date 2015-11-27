app.controller('PlayerController', ['$scope', 'sound', function($scope, sound) {
  this.sound = null;
  this.title = "";
  this.state = 'stopped';
  this.error = "";
  
  this.load = function(id, title) {
    this.state = 'loading';
    this.title = title;
    
    if (this.sound) {
      this.sound.stop();
      this.sound = null;
      this.title = "";
    }
    
    var _this = this;
    sound(id).then(function(sound) {
      
      sound.addEventListener('play', function() {
        _this.state = 'playing';
        $scope.$apply();
      });
      sound.addEventListener('pause', function() {
        _this.state = 'paused';
        $scope.$apply();
      });
      sound.addEventListener('ended', function() {
        _this.state = 'stopped';
        $scope.$apply();
      });
      
      _this.sound = sound;
      _this.sound.play();
    }, function(err) {
      console.error(err);
      _this.state = 'error';
    });
    
    $scope.$apply();
  }
  
  this.play = function() {
    console.log("-> Play", this.sound);
    this.sound.play();
  }
  
  this.pause = function() {
    console.log("-> Pause", this.sound);
    this.sound.pause();
  }
  
  this.getTitle = function() {
    if (this.state != 'loading' && this.state != 'error') {
      return this.title;
    }
  }
  
  this.getMsg = function() {
    if (this.state == 'loading') {
      return "Loading...";
    } else if (this.state == 'error') {
      return "An error occurred.";
    }
  }
  
  this.getShowControls = function() {
    return this.state != 'loading' && this.state != 'error';
  }
}]);
