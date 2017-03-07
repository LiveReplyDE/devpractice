// Packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');

// Configuration
var port = process.env.PORT || config.port;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

// Routes
// get an instance of the router for api routes
var apiRoutes = express.Router();

apiRoutes.post('/authenticate', function (req, res) {
		// find the users
		User.findOne({
				name: req.body.name
		}, function (err, user) {
				if (err) throw err;

				// if user is not matching in db
				if (!user) {
						res.json({
								success: false,
								message: 'Authentication failed. User not found'
						});
				} else if (user) { // if user name is matching in db

						// if password of found user is wrong
						if (user.password != req.body.password) {
								res.json({
										success: false,
										message: 'Authentication failed. Wrong password.'
								});
						} else { // if everything is fine
								// create a token
								var token = jwt.sign(user, app.get('superSecret'), {
										expiresIn: 1440 // expires in 24 hours
								});

								// return the information including token as json
								res.json({
										success: true,
										message: 'Login successful!',
										token: token
								});
						}
				}
		});
		console.log("Request body: " + JSON.stringify(req.body));
		console.log("Response body: " + JSON.stringify(res.body));
});

// users endpoint - get / create
apiRoutes.route('/users')
	.get(function(req, res) {
		User.find({}, function (err, users) {
				res.json(users);
		});
	})
	.post(function(req, res) {
		var user = new User({
			name: req.body.name,
			password: req.body.password,
			admin: true
		});

		user.save(function(err) {
			if (err) throw err;

			console.log('User saved successfully');
			res.json({ success: true });
		 });
	});

// user endpoint - get / update / delete
apiRoutes.route('/users/:id')
	.get(function(req, res){
		User.findById(req.params.id, function(err, user){
			if (!user){
				res.status('404').send();
			}else{
				res.json(user);
			}
		});
	})
	.put(function(req, res){
        User.findById(req.params.id, function(err, user) {
            if (err){
                res.send(err);
			}

			// update name/password of the user
            user.name = req.body.name;
			user.password = req.body.password;

            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });
		})
	})
	.delete(function(req, res){
		User.remove({
			_id: req.params.id
		}, function(err, bear) {
				if (err)
					res.send(err);

				res.json({ message: 'Successfully deleted' });
		});
	});

// route middleware to verify a token
apiRoutes.use(function (req, res, next) {

		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		// decode token
		if (token) {

				// verifies secret and checks exp
				jwt.verify(token, app.get('superSecret'), function (err, decoded) {
						if (err) {
								return res.json({success: false, message: 'Failed to authenticate token.'});
						} else {
								// if everything is good, save the request for use in other routes
								req.decoded = decoded;
								next();
						}
				});
		} else {

				// if there is no token, return an error
				return res.status(403).send({
						success: false,
						message: 'No token provided.'
				});
		}
})

// show random message (GET http://localhost:8080/api)
apiRoutes.get('/', function (req, res) {
		res.json({message: 'Welcome to the coolest API on earth!'});
});

// apply the routes to our application wit hthe prefix /api
app.use('/api', apiRoutes);

 
// Start the server
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
