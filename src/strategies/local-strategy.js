import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../db/schemas/user.js";

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const findUser = await User.findById(id);
		if (!findUser) throw new Error("User Not Found");
		done(null, findUser);
	} catch (err) {
		done(err, null);
	}
});

export default passport.use(
	new Strategy(async (username, password, done) => {
		try {
			const findUser = await User.findOne({ username });
			if (!findUser || findUser.password !== password)
				throw new Error(
					"Invalid credentials check the username or password and try again"
				);
			done(null, findUser);
		} catch (error) {
			done(error, null);
		}
	})
);
