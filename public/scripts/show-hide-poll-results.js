var socket = io();

var hideOrShowResultsButton = document.getElementById('hide-show-results');

hideOrShowResultsButton.addEventListener('click', function () {
  hideOrShowPollResults(this.innerText);
});

function hideOrShowPollResults(option) {
  if (option.includes('Hide')) {
    hideOrShowResultsButton.innerText = 'Show results';
    socket.send('hidePoll', { pollId: poll.id });
  } else {
    hideOrShowResultsButton.innerText = 'Hide results';
    socket.send('showPoll', { pollId: poll.id });
  }
}
