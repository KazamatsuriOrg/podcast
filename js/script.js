$(function() {
  // Enable PJAX loading; allows the player to persist between pages
  $(document).pjax('a', '#content', { fragment: '#content' });
});
