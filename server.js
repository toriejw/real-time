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

const socketIo = require('socket.io');
const io = socketIo(server);


module.exports = app;
