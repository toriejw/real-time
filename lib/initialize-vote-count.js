module.exports = (responses) => {
  var voteCount = {};

  responses.forEach(function (response) {
    voteCount[response] = 0;
  });

  return voteCount;
};
