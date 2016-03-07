const countVotes = require('../lib/count-votes.js');
const assert = require('assert');

describe ('countVotes', () => {
  var votes = {'socket-id1': 'first',
               'socket-id2': 'first',
               'socket-id3': 'second',
               'socket-id4': 'first'};

  var responses = ['first', 'second', 'third'];

  it('counts the votes for a given list of choices', function () {
    var actualVoteCount = countVotes(votes, responses);
    var expectedVoteCount = { 'first': 3, 'second': 1, 'third': 0 };

    assert.equal(actualVoteCount.first, expectedVoteCount.first);
    assert.equal(actualVoteCount.second, expectedVoteCount.second);
    assert.equal(actualVoteCount.third, expectedVoteCount.third);
  });

});
