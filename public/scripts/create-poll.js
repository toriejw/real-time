var addResponseButton = document.getElementById('add-response');

addResponseButton.addEventListener('click', function () {
  addAdditionalResponseOption();
});

var createPollButton = document.getElementById('create-poll');

createPollButton.addEventListener('click', function () {
  console.log('create poll plz')
});

function addAdditionalResponseOption() {
  var formResponses = document.getElementById('form-responses');

  var additionalResponse = document.createElement('INPUT');
  additionalResponse.className = 'form-control';
  
  var lineBreak = document.createElement('BR');

  formResponses.appendChild(additionalResponse);
  formResponses.appendChild(lineBreak);
}
