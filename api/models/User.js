module.exports = {
	attributes: {
		first_name:{
			type: 'string',
			unique: false,
			required: true,
			minLength: 2
		},
		last_name:{
			type: 'string',
			unique: false,
			required: true,
			minLength: 2
		},
		email: {
			type: 'string',
			unique: true,
			required: true
		},
		password: {
			type: 'string',
			required: true,
			minLength: 8
		}
	},
	beforeCreate: function(attrs, next){
		var bcrypt = require('bcrypt');

		bcrypt.genSalt(10, function(err, salt){
			if(err) return next(err);

			bcrypt.hash(attrs.password, salt, function(err, hash){
				if(err) return next(err);

				attrs.password = hash;
				next();
			});
		});
	}
};

