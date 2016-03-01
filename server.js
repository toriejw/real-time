const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.locals.title = 'Crowdsource';

app.get('/', (request, response) => {
  response.render('index');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});

module.exports = app;
