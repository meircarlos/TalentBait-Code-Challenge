const express = require("express");
const sentences = require("./routes/sentences");

module.exports = () => {
	const appRouter = express.Router();

	sentences(appRouter);

	return appRouter;
};
