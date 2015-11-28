app.controller('PlayerController', ['$scope', 'sound', function($scope, sound) {
  this.sound = null;
  this.title = "Test title";
  
  this.state = 'stopped';
  this.position = 0;
  this.duration = 0;
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
        _this.sound = null;
        $scope.$apply();
      });
      sound.addEventListener('timeupdate', function() {
        var newPosition = Math.round(_this.sound.currentTime);
        var newDuration = Math.round(_this.sound.duration);
        if (newPosition != _this.position || newDuration != _this.duration) {
          _this.position = newPosition;
          _this.duration = newDuration;
          $scope.$apply();
        }
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
  
  this.stop = function() {
    console.log("-> Stop", this.sound);
    this.sound.pause();
    this.sound = null;
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
