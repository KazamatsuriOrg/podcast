// Invoke the player from play links
function playClickHandler() {
  var playerElement = document.getElementById('player');
  var player = angular.element(playerElement).scope().player;
  player.load($(this).data('play'));
}
$(document).on('ready pjax:end', function() {
  $('[data-play]').click(playClickHandler);
});

$(function() {
  // Enable PJAX loading; allows the player to persist between pages
  $(document).pjax('a', '#content', { fragment: '#content' });
});
