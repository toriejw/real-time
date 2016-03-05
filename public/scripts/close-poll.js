var socket = io();

var closePollButton = document.getElementById('close-poll');
var pollStatusMsg = document.getElementById('poll-status-msg');

closePollButton.addEventListener('click', function () {
  socket.send('closePoll', { pollId: poll.id });
});

socket.on('pollSuccessfullyClosed', function () {
  pollStatusMsg.innerHTML = 'Poll is closed';
});
