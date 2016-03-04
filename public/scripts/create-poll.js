var socket = io();

var addResponseButton = document.getElementById('add-response');

addResponseButton.addEventListener('click', function () {
  addAdditionalResponseOption();
});

var createPollButton = document.getElementById('create-poll');

createPollButton.addEventListener('click', function () {
  var poll = getPollInfo();

  socket.send('pollCreated', poll);
});

var pollUrlsDiv = document.getElementById('poll-urls');

socket.on('pollSuccessfullyCreated', function (urls) {
  pollUrlsDiv.innerHTML = 'Poll URL: <a href="http://' + urls.pollUrl + '">' + urls.pollUrl + '</a><br>' +
                          'Admin URL: <a href="http://' + urls.adminUrl + '">' + urls.adminUrl + '</a><br><br>';
});

function addAdditionalResponseOption() {
  var formResponses = getResponsesDiv();

  var additionalResponse = document.createElement('INPUT');
  additionalResponse.className = 'form-control poll-response';

  var lineBreak = document.createElement('BR');

  formResponses.appendChild(additionalResponse);
  formResponses.appendChild(lineBreak);
}

function getPollInfo() {
  return { question: getPollQuestion(), responses: getPollResponses() };
}

function getPollQuestion() {
  return document.getElementById('poll-question').value;
}

function getPollResponses() {
  var formResponses = getResponsesDiv().getElementsByClassName('poll-response');

  return Array.prototype.map.call(formResponses, function(response) {
    return response.value;
  });
}

function getResponsesDiv() {
  return document.getElementById('form-responses');
}
