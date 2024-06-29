export const postSchemaValidators = {
	username: {
		isLength: {
			options: {
				min: 5,
				max: 40,
			},
			errorMessage:
				"Username must be at min of 5 and max of 40 character",
		},
		notEmpty: {
			errorMessage: "Username cannot be empty",
		},
		isString: {
			errorMessage: "Username must be string",
		},
	},
	password: {
		isLength: {
			options: {
				min: 8,
				max: 20,
			},
			errorMessage:
				"Password must be at min of 8 and max of 20 character",
		},
		notEmpty: {
			errorMessage: "Password cannot be empty",
		},
		isString: {
			errorMessage: "Password must be string",
		},
	},

	firstName: {
		notEmpty: {
			errorMessage: "You need to input your name",
		},
	},
	lastName: {
		notEmpty: {
			errorMessage: "You need to input your name",
		},
	},
};
