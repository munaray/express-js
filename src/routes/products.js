import { signedCookie } from "cookie-parser";
import { Router } from "express";

const router = Router();

router.get("/products", (request, response) => {
	console.log(request.headers.cookie);
	console.log(request.cookies);
	console.log(request.signedCookies);

	if (request.signedCookies.hello && request.signedCookies.hello === "world")
		response.send([{ id: 12, name: "potato salad", price: 100.5 }]);
	return response.status(403).send({
		msg: "Sorry you need to provide the correct cookie",
	});
});

export default router;
