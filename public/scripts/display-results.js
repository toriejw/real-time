var socket = io();

var resultsDiv = document.getElementById('results-' + poll.id);

if (resultsDiv) {
  if (poll.isVisible) {
    showPollResults();
  } else {
    hidePollResults();
  }
}

displayResults(poll);

socket.on('updateResults', function (updatedPoll) {
  if (resultsDiv) { displayResults(updatedPoll); }
});

socket.on('hidePollResults', function (pollId) {
  if (pollId === poll.id) { hidePollResults(); }
});

socket.on('showPollResults', function (pollId) {
  if (pollId === poll.id) { showPollResults(); }
});

function hidePollResults() {
  resultsDiv.className = 'hidden';
}

function showPollResults() {
  resultsDiv.className = 'visible';
}

function displayResults(poll) {
  var plotData = [
    { x: poll.responses,
      y: getYValues(poll),
      type: 'bar' }
    ];

    Plotly.newPlot('results-' + poll.id, plotData);
  }

function getYValues(poll) {
  return poll.responses.map(function(response) {
    return poll.voteCount[response];
  });
}
