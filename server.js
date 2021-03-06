const http = require('http');
const express = require('express');
const countVotes = require('./lib/count-votes.js')
const schedule = require('node-schedule');
const pollTracker = require('./lib/poll.js');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

app.use(express.static('public'));

app.locals.title = 'Crowdsource';
app.locals.polls = pollTracker.initializePollDatabase();

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/poll/:id', (request, response) => {
  response.render('poll', { poll: findPoll(request.params.id) });
});

app.get('/admin/:id', (request, response) => {
  response.render('admin', { poll: findPoll(request.params.id) });
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
      var poll = pollTracker.initializePoll(msg);
      app.locals.polls[poll.id] = poll;

      var baseUrl = socket.conn.request.headers.host;

      socket.emit('pollSuccessfullyCreated', { pollUrl: baseUrl + '/poll/' + poll.id,
                                               adminUrl: baseUrl + '/admin/' + poll.id} );
    } else if (channel === 'voteCast') {
      var poll = app.locals.polls[msg.pollId];

      if (poll.isOpen) {
        poll.votes[socket.id] = msg.vote;
        poll.voteCount = countVotes(poll.votes, poll.responses);

        socket.emit('voteSuccessfullyRecorded', poll.votes[socket.id]);
        io.sockets.emit('updateResults', poll);
      } else {
        socket.emit('voteNotRecorded');
      }

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
    } else if (channel === 'openPoll') {
      var poll = app.locals.polls[msg.pollId];

      poll.isOpen = true;
      socket.emit('pollSuccessfullyOpened');
    } else if (channel === 'setPollCloseTime') {
      var poll = app.locals.polls[msg.pollId];
      var currentDate = new Date(Date.now());
      var closeDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay(), msg.hour, msg.minute);

      schedule.scheduleJob(closeDate, function () {
        poll.isOpen = false;
        socket.emit('pollSuccessfullyClosed');
      });
    }
  });

});

function findPoll(pollId) {
  return app.locals.polls[pollId];
}

module.exports = app;
