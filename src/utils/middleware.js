import { mockData } from "../db/data.js";

export const resolveIndexByUserId = (request, response, next) => {
	const {
		params: { id },
	} = request;
	const parsedId = parseInt(id);
	if (isNaN(parsedId)) response.sendStatus(400);
	const findUserIndex = mockData.findIndex((user) => user.id === parsedId);
	if (findUserIndex === -1) response.sendStatus(404);
	request.findUserIndex = findUserIndex;
	next();
};
