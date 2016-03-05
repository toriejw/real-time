var socket = io();

var closePollButton = getClosePollButton();
var openPollButton = getOpenPollButton();

var pollClosedStatusMsg = getClosedPollStatusMsg();
var pollOpenStatusMsg = getOpenPollStatusMsg();

var setPollCloseTimeButton = document.getElementById('set-poll-close-time');

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

setPollCloseTimeButton.addEventListener('click', function () {
  var hour = document.getElementById('close-poll-hour');
  var minute = document.getElementById('close-poll-minute');

  document.getElementById('poll-schedule-status').innerText = 'Your poll is schedule to close at ' + hour.value + ':' + minute.value + ' UTC time.';

  socket.send('setPollCloseTime', { hour: hour, minute: minute, pollId: poll.id});
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
