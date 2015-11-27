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
    this.sound = sound(id);
    this.sound.on('load', function() {
      console.log("Loaded");
      _this.play();
      $scope.$apply();
    });
    this.sound.on('loaderror', function(_, err) {
      console.log("Load Error", err);
      _this.state = 'error';
      _this.error = err;
      $scope.$apply();
    });
    this.sound.on('play', function() {
      console.log("Play");
      _this.state = 'playing';
      $scope.$apply();
    });
    this.sound.on('pause', function() {
      console.log("Pause");
      _this.state = 'paused';
      $scope.$apply();
    });
    this.sound.on('stop', function() {
      console.log("Stop");
      _this.state = 'stopped';
      $scope.$apply();
    });
    this.sound.on('end', function() {
      console.log("End");
      _this.state = 'stopped';
      $scope.$apply();
    });
  }
  
  this.play = function() {
    this.sound.play();
  }
  
  this.pause = function() {
    this.sound.pause();
  }
}]);
