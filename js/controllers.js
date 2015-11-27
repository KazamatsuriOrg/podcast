app.controller('PlayerController', ['sound', function(sound) {
  this.sound = null;
  this.title = "";
  this.state = 'stopped';
  
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
      _this.sound = sound;
      _this.play();
    }, function(err) {
      _this.state = 'error';
      _this.error = err;
    });
  }
  
  this.play = function() {
    this.state = 'playing';
    this.sound.play();
  }
  
  this.pause = function() {
    this.state = 'paused';
    this.sound.pause();
  }
}]);
