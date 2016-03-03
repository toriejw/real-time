var socket = io();

var buttons = document.querySelectorAll('#responses button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', { pollId: this.id, vote: this.innerText });
  });
}

var voteStatusDiv = document.getElementById('voteStatus');

socket.on('voteSuccessfullyRecorded', function(voteRecorded) {
  voteStatusDiv.className = 'alert alert-success';
  voteStatusDiv.innerHTML = 'Your vote has been recorded. <br>You selected: ' + voteRecorded;
});
