module.exports = {
	isAuth: function(req, res){
		if (!req.session.authenticated){
			res.json({ error: 'User not authenticated' }, 409);
		}else{
			res.send(200);
		}
	},
	login: function(req, res){
		var bcrypt = require('bcrypt');

		User.findOne({email: req.body.email}, function(err, user){
			if(err) res.json({ error: 'DB error' }, 500);

			if(user){
				bcrypt.compare(req.body.password, user.password, function(err, match){
					if(err) res.json({ error: 'Server error' }, 500);

					if(match){
						// password match
						req.session.user = user.id;
						req.session.authenticated = true;
						res.json(user);
					}else{
						// invalid password
						if(req.session.user) req.session.user = null;
						res.json({ error: 'Invalid password' }, 400);
					}
				});
			}else{
				res.json({ error: 'User not found' }, 404);
			}
		});

	},
	logout: function(req, res){
		req.session.user = null;
		req.session.authenticated = false;
		res.send("Successfully logged out");
	}
};

