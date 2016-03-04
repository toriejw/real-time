const initializeVoteCount = require('./initialize-vote-count')

module.exports = (votes, responses) => {
  var voteCount = initializeVoteCount(responses);

  for (var vote in votes) {
    voteCount[votes[vote]]++;
  }
  return voteCount;
}
