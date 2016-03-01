const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
// app.locals.title = 'Crowdsource';

app.get('/', (request, response) => {
  response.send('Hi');
});

app.listen(app.get('port'), () => {
  console.log(`Application is running on ${app.get('port')}`);
});

module.exports = app;
