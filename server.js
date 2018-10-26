const express = require('express'),
  path = require('path'),
  app = express(),
  port = 3000;

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/public/views'));

app.get('/', (request, response) => {
  response.redirect('/public/views/index.html');
});
app.get('/:route', (request, response) => {
  response.sendFile(`${request.params.route}.html`, { root: `${__dirname}/public/views` });
});

app.listen(port, (err) => {
  if (err) {
    return console.log('error: ', err);
  }

  console.log(`server is listening on ${port}`);
});
