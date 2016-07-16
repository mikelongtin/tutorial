
// Modules
var express        = require('express');
var jade           = require('jade');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var compress       = require('compression');
var favicon        = require('serve-favicon');
var methodOverride = require('method-override');
var log4js         = require('log4js');

// Logger
log4js.configure(
{
	appenders:
	[
		{ type: 'console' },
		{ type: 'file', filename: 'server.log', category: 'server', maxLogSize: 20480, backups: 10 }
	]
});

// Set Configs
var config = require('./config/config');

// Application
var app = module.exports = express();
app.set('etag', 'strong');
app.set('port', process.env.PORT);
app.set('view engine', 'jade');
app.set('views', config.path.app.views);
app.use(favicon(config.path.public + '/img/favicon.ico')); 
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  
app.use(cookieParser());
app.use(methodOverride());
app.use(compress());
app.use(express.static(config.path.dist));
app.use(express.static(config.path.public));

// Set CORS Headers
function allowCrossDomain (req, res, next)
{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
};

var log = log4js.getLogger('server');

// Development error handler
if (app.get('env') === 'development')
{
    app.use(function (err, req, res, next)
    {
        log.error("Something went wrong:", err);
        res.status(err.status || 500);
        res.render('error',
        {
            message: err.message,
            error: err
        });
    });
}

// Production error handler
app.use(function (err, req, res, next)
{
    log.error("Something went wrong:", err);
    res.status(err.status || 500);
    res.render('error',
    {
        message: err.message,
        error: {}
    });
});

// Initialize App
require(config.path.config.init)();
