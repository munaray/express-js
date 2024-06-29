import { Router } from "express";
import { mockData } from "../db/data.js";
import passport from "passport";
import "../strategies/local-strategy.js";

const router = Router();

router.get("/auth/status", (request, response) => {
	console.log(`Inside /auth/status endpoint`);
	console.log(request.user);
	console.log(request.session);
	return request.user
		? response.send(request.user)
		: response.sendStatus(401);
	// request.sessionStore.get(request.sessionID, (err, session) => {
	// 	console.log(session);
	// });
	// return request.session.user
	// 	? response.status(200).send(request.session.user)
	// 	: response.status(401).send({ msg: "Not Authenticated" });
});

router.post("/auth", passport.authenticate("local"), (request, response) => {
	response.sendStatus(201);
	/* const {
		body: { username, password },
	} = request;

	const findUser = mockData.find((user) => user.username === username);
	if (!findUser || findUser.password !== password)
		response.status(401).send({ msg: "BAD CREDENTIAL" });

	request.session.user = findUser;
	return response.status(200).send(findUser); */
});

router.post("/auth/logout", (request, response) => {
	if (!request.user) response.sendStatus(401);

	request.logOut((err) => {
		if (err) response.sendStatus(400);
		response.sendStatus(200);
	});
});

export default router;
