'use strict';

if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY,
    appName: 'Kinetoscope' // optional
  });
}

var express = require('express');
var path = require('path');
var util = require('util');
var request = require('request');
var app = express();

process.on('uncaughtException', function (err) {
  console.log(err);
});

app.configure('development', function () {
  app.set('port', process.env.PORT || 9000);
  app.set('views', path.join(__dirname, '/app'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'app')));
});

app.configure('production', function () {
  app.set('port', process.env.PORT || 9000);
  app.set('views', path.join(__dirname, '/dist'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.compress());
  app.use(express.static(path.join(__dirname, 'dist')));
});

var rottenTomatoesKeys = process.env.ROTTEN_TOMATOES_APIKEY.split(',');

var handleEscapedFragment = function (req, res, next) {
  var userAgent = req.headers['user-agent'];

  if (userAgent.match('facebookexternalhit')) {
    var movieRoute = null;
    var apiKey = rottenTomatoesKeys[Math.floor(Math.random() * rottenTomatoesKeys.length)];

    if (req.param('movieId')){
      request({
        uri: 'http://api.rottentomatoes.com/api/public/v1.0/movies/' + req.param('movieId') + '.json',
        method: 'GET',
        qs: util._extend({
          apiKey: apiKey
        }, req.query)
      }, function(error, response, body){
        if (error) return res.send(500, error);
        return res.render('opengraph/movie_details', {
          movie: JSON.parse(body),
          facebook: {
            appId: '177530099095061'
          }
        });
      });
    }
    else {
      return res.send(404);
    }
  }
  else {
    return next();
  }
};

app.all('/', function(req, res){
  if (req.param('code')) {
    res.redirect('/');
  }

  res.render('index');
});

app.all('/search', function(req, res){
  res.render('index');
});

app.all('/movie/:movieId', handleEscapedFragment, function(req, res){
  res.render('index');
});

app.all('/rt/api/public/v1.0/*', function (req, res) {
  var baseUrl = 'http://api.rottentomatoes.com/api/public/v1.0/';
  var apiKey = rottenTomatoesKeys[Math.floor(Math.random() * rottenTomatoesKeys.length)];
  var uri = baseUrl + req.params[0];
  var method = req.method.toLowerCase();

  request({
    uri: uri,
    method: method,
    qs: util._extend({
      apiKey: apiKey
    }, req.query)
  }, function(error, response, body){
    if (error) {
      return res.send(500, error);
    }
    return res.send(JSON.parse(body));
  });
});

app.get('/image', function(req, res){
  request(req.query.url).pipe(res);
});

require('http').createServer(app).listen(app.get('port'), function () {
  console.log('Express (' + app.get('env') + ') server listening on port ' + app.get('port'));
});
