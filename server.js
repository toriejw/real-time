const http = require('http');
const express = require('express');
const generateId = require('./lib/generate-id');
const initializeVoteCount = require('./lib/initialize-vote-count.js');
const countVotes = require('./lib/count-votes.js')

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

app.use(express.static('public'));

app.locals.title = 'Crowdsource';
app.locals.polls = {};

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/poll/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('poll', { poll: poll });
});

app.get('/admin/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('admin', { poll: poll });
});

var port = process.env.PORT || 3000;
var server = http.createServer(app);

server.listen(port, () => {
  console.log(`${app.locals.title} is listening on port ${app.get('port')}`);
});

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function (socket) {

  socket.on('message', function (channel, msg) {
    if (channel === 'pollCreated') {
      var id = generateId();
      var poll = msg;

      poll.id = id;
      poll.voteCount = initializeVoteCount(poll.responses);
      poll.votes = {};
      poll.isVisible = true;
      poll.isOpen = true;

      app.locals.polls[id] = poll;

      var baseUrl = socket.conn.request.headers.host;

      socket.emit('pollSuccessfullyCreated', { pollUrl: baseUrl + '/poll/' + id,
                                               adminUrl: baseUrl + '/admin/' + id} );
    } else if (channel === 'voteCast') {
      var poll = app.locals.polls[msg.pollId];

      poll.votes[socket.id] = msg.vote;
      poll.voteCount = countVotes(poll.votes, poll.responses);

      socket.emit('voteSuccessfullyRecorded', poll.votes[socket.id]);
      io.sockets.emit('updateResults', poll);
    } else if (channel === 'hidePoll') {
      var poll = app.locals.polls[msg.pollId];
      poll.isVisible = false;

      io.sockets.emit('hidePollResults', poll.id);
    } else if (channel === 'showPoll') {
      var poll = app.locals.polls[msg.pollId];
      poll.isVisible = true;

      io.sockets.emit('showPollResults', poll.id);
    } else if (channel === 'closePoll') {
      var poll = app.locals.polls[msg.pollId];
      poll.isOpen = false;
      socket.emit('pollSuccessfullyClosed');
    }
  });

});

module.exports = app;
