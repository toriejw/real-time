var socket = io();

var resultsDiv = document.getElementById('results-' + poll.id);

displayResults(poll);

socket.on('updateResults', function (poll) {
  if (resultsDiv) {
    displayResults(poll);
  }
});

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
