import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import routes from "./routes/index.js";
import { mockData } from "./db/data.js";

const app = express();

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
app.use("/api", routes);

app.get("/", (request, response) => {
	console.log(request.session);
	console.log(request.session.id);
	request.session.visited = true;
	response.cookie("hello", "world", { maxAge: 30000, signed: true });
	response.send({ msg: "Hello world" });
});

app.post("/api/auth", (request, response) => {
	const {
		body: { username, password },
	} = request;

	const findUser = mockData.find((user) => user.username === username);
	if (!findUser || findUser.password !== password)
		response.status(401).send({ msg: "BAD CREDENTIAL" });

	request.session.user = findUser;
	return response.status(200).send(findUser);
});

app.get("/api/auth/status", (request, response) => {
	request.sessionStore.get(request.sessionID, (err, session) => {
		console.log(session);
	});
	return request.session.user
		? response.status(200).send(request.session.user)
		: response.status(401).send({ msg: "Not Authenticated" });
});

app.post("/api/cart", (request, response) => {
	if (!request.session.user) response.sendStatus(401);

	const { body: item } = request;
	const { cart } = request.session;
	if (cart) {
		cart.push(item);
	} else {
		request.session.cart = [item];
	}
	return response.status(201).send(item);
});

app.get("/api/cart", (request, response) => {
	if (!request.session.user) response.sendStatus(401);

	return response.send(request.session.cart ?? []);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
});
