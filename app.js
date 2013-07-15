var express = require('express');
var path = require('path');
var app = express();

app.configure('production', function () {
  app.set('port', process.env.PORT || 9000);
  app.set('views', path.join(__dirname, '/dist'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(app.directory, 'dist')));
});

app.get('/', function(req, res){
  res.render('index');
});

require('http').createServer(app).listen(app.get('port'), function () {
    console.log('Express (' + app.get('env') + ') server listening on port ' + app.get('port'));
});
