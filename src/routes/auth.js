import { Router } from "express";
import passport from "passport";
import "../strategies/local-strategy.js";

const router = Router();

router.get("/auth/status", (request, response) => {
	return request.user
		? response.send(request.user)
		: response.sendStatus(401);
});

router.post("/auth", passport.authenticate("local"), (request, response) => {
	response.sendStatus(201);
});

router.post("/auth/logout", (request, response) => {
	if (!request.user) response.sendStatus(401);

	request.logOut((err) => {
		if (err) response.sendStatus(400);
		response.sendStatus(200);
	});
});

export default router;
