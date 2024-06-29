import { Router } from "express";

const router = Router();

router.get("/cart", (request, response) => {
	if (!request.session.user) response.sendStatus(401);

	return response.send(request.session.cart ?? []);
});

router.post("/cart", (request, response) => {
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

export default router;
