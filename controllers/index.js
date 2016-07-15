var mongoose=require('mongoose');
require('../models/employee');
var Employee = mongoose.model('Employee');
module.exports = function(app){
	require('./home.js')(app);
    require('./project.js')(app);
	app.get('/', function (req, res) {
	    res.json(req.user);
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
            console.log("Login successful!");
            req.session.user=employee;
            res.json(req.session.user);
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
            req.session.user = employee;
            res.json(employee);
        });
    });	

	app.get('/logout', function(req, res) {
        req.session.destroy();
        res.json('Logged out!');
    });
}