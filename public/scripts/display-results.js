var socket = io();

socket.on('updateResults', function (poll) {
  if (document.getElementById('results-' + poll.id)) {
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
