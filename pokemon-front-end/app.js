var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.set('views', './public/views');
app.set('view engine', 'pug')
console.log(__dirname)

app.get('/', function (req, res) {
  res.render('index', { title: 'Register'});
});

app.get('/map', function (req, res) {
  res.render('map', { title: 'Catch em'});
});

app.get('/login', function (req, res) {
  res.render('login', { title: 'Login'});
});

app.get('/error', function (req, res) {
  res.render('error', { title: 'uh ohh'});
});

app.listen(9000, function () {
  console.log('Example app listening on port 9000!');
});
