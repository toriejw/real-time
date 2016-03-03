const http = require('http');
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

app.use(express.static('public'));

app.locals.title = 'Crowdsource';

app.get('/', (request, response) => {
  response.render('index');
});

var port = process.env.PORT || 3000;
var server = http.createServer(app);

server.listen(port, () => {
  console.log(`${app.locals.title} is listening on port ${app.get('port')}`);
});

var polls = {};

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function (socket) {

  socket.on('message', function (channel, poll) {
    if (channel === 'pollCreated') {
      polls[socket.id] = poll;

      var baseUrl = socket.conn.request.headers.host;

      socket.emit('pollSuccessfullyCreated', {pollUrl: baseUrl + socket.id,
                                              adminUrl: baseUrl + '/admin' + socket.id});
      // send back to client the url of the poll and the admin url for the poll (user must refresh page to make new poll)
    }
  });

});

module.exports = app;
