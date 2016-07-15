var express  = require('express');
var app      = express();     
var http = require('http')                        
var mongoose = require('mongoose');  
var morgan = require('morgan');             
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var flash    = require('connect-flash');
var http = require('http');
// configuration =================

mongoose.connect('mongodb://localhost/timesheet');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(cookieParser());
app.use(bodyParser());
app.use(expressSession({secret: 'a secret'}));

app.use(flash());

app.use(function(req,res,next){
	if(req.user){
		
	}
	else if(req.session.userId){
		req.user = req.session.userId;
		if((Date.now()-req.session.timestamp)>18000)
			req.session.destroy();
	}
	next();
});

require('./controllers/index')(app);
// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");