const http = require('http');
const express = require('express');
const generateId = require('./lib/generate-id');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

app.use(express.static('public'));

app.locals.title = 'Crowdsource';

var polls = {};

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/poll/:id', (request, response) => {
  var poll = polls[request.params.id];

  response.render('poll', { poll: poll });
});

var port = process.env.PORT || 3000;
var server = http.createServer(app);

server.listen(port, () => {
  console.log(`${app.locals.title} is listening on port ${app.get('port')}`);
});

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function (socket) {

  socket.on('message', function (channel, poll) {
    if (channel === 'pollCreated') {
      var id = generateId();
      polls[id] = poll;

      var baseUrl = socket.conn.request.headers.host;

      socket.emit('pollSuccessfullyCreated', { pollUrl: baseUrl + '/poll/' + id,
                                               adminUrl: baseUrl + '/admin/' + id} );
    }
  });

});

module.exports = app;
