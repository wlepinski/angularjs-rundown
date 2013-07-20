'use strict';

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

app.get('/', function(req, res){
  res.render('index');
});

app.all('/api/public/v1.0/*', function (req, res) {
  var baseUrl = 'http://api.rottentomatoes.com/api/public/v1.0/';
  var apiKey = process.env.ROTTEN_TOMATOES_APIKEY;
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
