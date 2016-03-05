var socket = io();

var openPollButton = document.getElementById('open-poll');
var pollStatusMsg = document.getElementById('poll-status-msg');

closePollButton.addEventListener('click', function () {
  socket.send('openPoll', { pollId: poll.id });
});

// socket.on('pollSuccessfullyClosed', function () {
//   pollStatusMsg.innerHTML = 'Poll is closed';
// });
