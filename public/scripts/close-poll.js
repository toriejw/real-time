var socket = io();

var closePollButton = getClosePollButton();
var openPollButton = getOpenPollButton();
var pollClosedStatusMsg = getClosedPollStatusMsg();
var pollOpenStatusMsg = getOpenPollStatusMsg();

if (poll.isOpen) {
  openPoll();
} else {
  closePoll();
}

closePollButton.addEventListener('click', function () {
  socket.send('closePoll', { pollId: poll.id });
});

openPollButton.addEventListener('click', function () {
  socket.send('openPoll', { pollId: poll.id });
  openPoll();
});

socket.on('pollSuccessfullyClosed', function () {
  closePoll();
});

function closePoll() {
  pollOpenStatusMsg.className = 'hidden';
  pollClosedStatusMsg.className = 'visible';
}

function openPoll() {
  pollOpenStatusMsg.className = 'visible';
  pollClosedStatusMsg.className = 'hidden';
}

function getOpenPollButton () {
  return document.getElementById('open-poll');
}

function getOpenPollStatusMsg () {
  return document.getElementById('poll-open');
}

function getClosePollButton () {
  return document.getElementById('close-poll');
}

function getClosedPollStatusMsg () {
  return document.getElementById('poll-closed');
}
