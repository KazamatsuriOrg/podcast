$(function() {
  // Enable PJAX loading; allows the player to persist between pages
  $(document).pjax('a', '#content', { fragment: '#content' });
  
  // Invoke the player from play links
  $('[data-play]').click(function() {
    var playerElement = document.getElementById('player');
    var player = angular.element(playerElement).scope().player;
    player.load($(this).data('play'));
  });
});
