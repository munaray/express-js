import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	firstName: {
		type: mongoose.Schema.Types.String,
		require: true,
	},
	lastName: {
		type: mongoose.Schema.Types.String,
		require: true,
	},
	username: {
		type: mongoose.Schema.Types.String,
		require: true,
		unique: true,
	},
	password: {
		type: mongoose.Schema.Types.String,
		require: true,
	},
});

export const User = mongoose.model("User", UserSchema);
