const initializeVoteCount = require('../lib/initialize-vote-count.js');
const assert = require('assert');

describe('initializeVoteCount', () => {
  var responses = ['first', 'second', 'third'];

  it('initializes a vote counte for a given list of responses', function () {
    var expectedInitializedVoteCount = { first: 0, second: 0, third: 0 };
    var actualInitializedVoteCount = initializeVoteCount(responses);

    assert.equal(actualInitializedVoteCount.first, expectedInitializedVoteCount.first);
    assert.equal(actualInitializedVoteCount.second, expectedInitializedVoteCount.second);
    assert.equal(actualInitializedVoteCount.third, expectedInitializedVoteCount.third);
  });
});
