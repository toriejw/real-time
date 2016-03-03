var socket = io();

var buttons = document.querySelectorAll('#responses button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', { pollId: this.id, vote: this.innerText });
  });
}

var voteStatusDiv = document.getElementById('vote-status');

socket.on('voteSuccessfullyRecorded', function(vote) {
  voteStatusDiv.className = 'alert alert-success';
  voteStatusDiv.innerHTML = 'Your vote has been recorded. <br>You selected: ' + vote;
});

socket.on('updateResults', function (poll) {
  displayResults(poll);
});

function displayResults(poll) {
  var plotData = [
    { x: poll.responses,
      y: getYValues(poll),
      type: 'bar' }
    ];

    Plotly.newPlot('results', plotData);
  }

function getYValues(poll) {
  return poll.responses.map(function(response) {
    return poll.voteCount[response];
  });
}
