import { Router } from "express";
import {
	query,
	validationResult,
	matchedData,
	checkSchema,
} from "express-validator";
import { postSchemaValidators } from "../utils/schemaValidators.js";
import { mockData } from "../db/data.js";
import { resolveIndexByUserId } from "../utils/middleware.js";
import { User } from "../db/schemas/user.js";

const router = Router();

router.get(
	"/users",
	query("filter")
		.isString()
		.notEmpty()
		.withMessage("Must not be empty")
		.isLength({ min: 3, max: 10 })
		.withMessage("Must be at least 3 to 10 character"),
	(request, response) => {
		console.log(request.session.id);
		request.sessionStore.get(request.session.id, (err, sessionData) => {
			if (err) {
				console.log(err);
				throw err;
			}
			console.log(sessionData);
		});
		const result = validationResult(request);
		console.log(result);
		const {
			query: { filter, value },
		} = request;
		if (filter && value)
			return response.send(
				mockData.filter((user) => user[filter].includes(value))
			);
		return response.send(mockData);
	}
);

router.get("/users/:id", resolveIndexByUserId, (request, response) => {
	const { findUserIndex } = request;
	const findUser = mockData[findUserIndex];
	if (!findUser) response.sendStatus(404);
	response.send(findUser);
});

router.post(
	"/users",
	checkSchema(postSchemaValidators),
	async (request, response) => {
		const result = validationResult(request);
		if (!result.isEmpty())
			response.status(400).send({ error: result.array() });

		const data = matchedData(request);
		const newUser = new User(data);
		try {
			const saveUser = await newUser.save();
			return response.status(201).send(saveUser);
		} catch (err) {
			return response.status(401).send({
				msg: `User with username ${newUser.username} already exist`,
			});
		}
	}
);

router.put("/users/:id", resolveIndexByUserId, (request, response) => {
	const { body, findUserIndex } = request;
	mockData[findUserIndex] = { id: mockData[findUserIndex].id, ...body };
	return response.sendStatus(204);
});

router.patch("/users/:id", resolveIndexByUserId, (request, response) => {
	const { body, findUserIndex } = request;
	mockData[findUserIndex] = { ...mockData[findUserIndex], ...body };
	return response.sendStatus(204);
});

router.delete("/users/:id", (request, response) => {
	const { findUserIndex } = request;
	mockData.splice(findUserIndex, 1);
	response.sendStatus(200);
});

export default router;
