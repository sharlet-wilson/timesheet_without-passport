var mongoose=require('mongoose');
var bcrypt   = require('bcrypt-nodejs');                  
require('../models/employee');
var Employee = mongoose.model('Employee');
module.exports = function(app){
    require('./home.js')(app);
    require('./project.js')(app);
	app.get('/', function (req, res) {
        res.json(req.session.userId);
	});

	app.post('/login',function(req,res){
        Employee.findOne({username: req.body.username},function(err,employee){
            if(err)
                return (err);
            if(!employee)
            {
                console.log("Username doesn't exist!");
                return res.json("Username doesn't exist!");
            }
            if(!employee.validPassword(req.body.password)){
                console.log("Incorrect password!");
                return res.json("Incorrect password!");
            }
            req.session.userId = bcrypt.hashSync(employee._id, bcrypt.genSaltSync(8), null);
            req.session.timestamp = Date.now()/1000;
            console.log("Login successful!");     
            res.json(req.session.userId);
        });
    });

	app.get('/register', function(req, res) {
	    res.json(req.user);
	});

	app.post('/register',function(req,res){
        var newEmployee = new Employee();
        newEmployee.username = req.body.username;
        newEmployee.name = req.body.name;
        newEmployee.password = newEmployee.generateHash(req.body.password);
        newEmployee.save(function(err,employee){
            if(err)
                return (err);
            req.session.userId = bcrypt.hashSync(employee._id, bcrypt.genSaltSync(8), null);
            req.session.timestamp = Date.now()/1000;
            res.json(employee);
        });
    });	

	app.get('/logout', function(req, res) {
        req.session.destroy();
        res.json('Logged out!');
    });
}