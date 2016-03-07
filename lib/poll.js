const generateId = require('./generate-id');
const initializeVoteCount = require('./initialize-vote-count.js');

function initializePollDatabase() {
  return {};
}

function initializePoll(basicPollInfo) {
  var poll = basicPollInfo;

  poll.id = generateId();
  poll.voteCount = initializeVoteCount(poll.responses);

  poll.votes = {};
  poll.isVisible = true;
  poll.isOpen = true;

  return poll;
}

module.exports = {
  initializePollDatabase,
  initializePoll
};
