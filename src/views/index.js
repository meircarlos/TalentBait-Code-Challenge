const express = require("express");
const SentencesService = require("../services/sentence");
const CONSTANTS = require("../constants");

const sentenceService = new SentencesService();

module.exports = () => {
	const appRouter = express.Router();

	appRouter.get("/", (request, response, next) => {
		try {
			return response.render("home");
		} catch (error) {
			return next(error);
		}
	});

	const sentenceRouter = express.Router();
	appRouter.use("/sentences", sentenceRouter);

	sentenceRouter.get("/", (request, response, next) => {
		try {
			return response.render("list", {
				categories: CONSTANTS.CATEGORIES,
			});
		} catch (error) {
			return next(error);
		}
	});

	sentenceRouter.get("/create", (request, response, next) => {
		try {
			return response.render("create", {
				categories: CONSTANTS.CATEGORIES,
			});
		} catch (error) {
			return next(error);
		}
	});

	const specificSentenceRouter = express.Router({ mergeParams: true });
	sentenceRouter.use("/:sentenceId", specificSentenceRouter);

	specificSentenceRouter.get("/", async (request, response, next) => {
		try {
			const sentenceId = request.params.sentenceId;

			const sentence = await sentenceService.getSentenceById(sentenceId);

			if (!sentence) {
				return response.status(401).json({
					message: `Sentence with Id ${sentenceId} does not exist`,
				});
			}

			return response.render("view", {
				sentence,
			});
		} catch (error) {
			return next(error);
		}
	});

	specificSentenceRouter.get("/update", async (request, response, next) => {
		try {
			const sentenceId = request.params.sentenceId;

			const sentence = await sentenceService.getSentenceById(sentenceId);

			if (!sentence) {
				return response.status(401).json({
					message: `Sentence with Id ${sentenceId} does not exist`,
				});
			}

			return response.render("update", {
				sentence,
				categories: CONSTANTS.CATEGORIES,
			});
		} catch (error) {
			return next(error);
		}
	});

	return appRouter;
};
