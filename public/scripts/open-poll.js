var socket = io();

var openPollButton = document.getElementById('open-poll');
var pollStatusMsg = document.getElementById('poll-status-msg');

openPollButton.addEventListener('click', function () {
  socket.send('openPoll', { pollId: poll.id });
});
