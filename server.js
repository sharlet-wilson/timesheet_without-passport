var express  = require('express');
var app      = express();                             
var mongoose = require('mongoose');                    
var morgan = require('morgan');             
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var flash    = require('connect-flash');

// configuration =================

mongoose.connect('mongodb://localhost/timesheet');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(cookieParser());
app.use(bodyParser());
app.use(expressSession({secret: 'a secret'}));

app.use(flash());

require('./controllers/index.js')(app);

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");