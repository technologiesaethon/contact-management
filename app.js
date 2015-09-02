var express = require('express');
var http = require('http');
var path = require('path');
var Utils=require('./config/Utils');
var app = express();
var config=require('./config/Config.json');
var MongoStore=require('connect-mongo')(express);
var AuthenticationMiddleware=require('./Utils/AuthenticationMiddleware');

// all environments;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('Sek7et'));
app.use(express.session({store:new MongoStore({
    db:config.mongodb.db,
    host:config.mongodb.host,
    port:config.mongodb.port,
    username:config.mongodb.username,
    password:config.mongodb.password
})}));
app.use(AuthenticationMiddleware());

app.use(app.router);


var urlMappings=require('./config/URLMappings')(app);
var MongoDatabaseProvider=require('./config/MongoDatabaseProvider');
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
MongoDatabaseProvider.initMongoose(function(){

    http.createServer(app).listen(process.env.PORT || config.port, function(){
        console.log('Express server listening on port ' + config.port);
    });
})
