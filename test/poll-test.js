const poll = require('../lib/poll.js');
const assert = require('assert');

describe('Poll', () => {

  it('initializes an empty poll database', function () {

    var database = poll.initializePollDatabase();
    var databaseKeys = Object.keys(database);

    assert.equal(databaseKeys.length, 0);
  });

  describe('initializing a new poll object', function () {
    var basicPollInfo = { title: "What's up?", responses: ["not much", "omg so much"] };
    var newPoll = poll.initializePoll(basicPollInfo);

    it('generates an id', function () {
      assert(newPoll.id);
    });

    it('intializes a poll vote count', function () {
      newPoll.responses.forEach(function(response) {
        assert.equal(newPoll.voteCount[response], 0);
      });
    });

    it('defaults visibility to true', function () {
      assert(newPoll.isVisible);
    });

    it ('defaults status to open', function () {
      assert(newPoll.isOpen);
    });

  });

});
