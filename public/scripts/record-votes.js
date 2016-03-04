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
