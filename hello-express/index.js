var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/first_template', function(req, res) {
  res.render('first_view');
});

app.get('/:id([0-9]*)', function(req, res){
  res.send('The id you specified is ' + req.params.id);
});

app.get('/things/:name/:id', function(req, res){
  res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});
//
// app.use(function(req, res, next){
//   console.log("New request at " + Date.now());
// });

app.use('/things', function(req, res, next){
  console.log("Request for things received at " + Date.now());
  next();
});
//
// app.get('/things', function(req, res){
//   res.send('Things');
// });

var things = require('./things.js');

app.use('/things', things);

app.get('*', function(req,res){
  res.send('Sorry, this is an invalid URL.');
});

app.listen(3000);
