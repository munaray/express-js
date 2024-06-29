import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strategy.js";
import mongoose from "mongoose";
import routes from "./routes/index.js";

const app = express();

mongoose
	.connect("mongodb://localhost/express-db")
	.then(() => console.log("Connected to Database"))
	.catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
	session({
		secret: "munaray the dev",
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 60000 * 60,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.get("/", (request, response) => {
	console.log(request.session);
	console.log(request.session.id);
	request.session.visited = true;
	response.cookie("hello", "world", { maxAge: 30000, signed: true });
	response.send({ msg: "Hello world" });
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
});
