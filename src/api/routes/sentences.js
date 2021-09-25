const express = require("express");
const SentencesController = require("../controllers/sentences");

module.exports = (appRouter) => {
	const sentencesRouter = express.Router();
	appRouter.use("/sentences", sentencesRouter);

	const sentencesController = new SentencesController();

	sentencesRouter.get("/", sentencesController.getAllSentences);

	sentencesRouter.post("/", sentencesController.createSentence);

	sentencesRouter.get("/translate", sentencesController.translateSentence);

	const specificSentenceRouter = express.Router({ mergeParams: true });
	sentencesRouter.use("/:sentenceId", specificSentenceRouter);

	specificSentenceRouter.get("/", sentencesController.getSentenceById);

	specificSentenceRouter.post("/", sentencesController.updateSentenceById);

	specificSentenceRouter.delete("/", sentencesController.deleteSentenceById);
};
