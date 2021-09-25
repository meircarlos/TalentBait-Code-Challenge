const SentencesService = require("../../services/sentence");
const TranslationService = require("../../services/translation");
const CONSTANTS = require("../../constants");

const sentencesService = new SentencesService();
const translationService = new TranslationService();

class SentencesController {
	async getAllSentences(request, response, next) {
		try {
			const limit =
				parseInt(request.query.limit) || CONSTANTS.DEFAULT_LIMIT_SIZE;
			const category = request.query.category;
			const sort = request.query.sort;
			const startAfter = request.query.startAfter;
			const endBefore = request.query.endBefore;

			const sentences = await sentencesService.getAllSentences({
				limit,
				category,
				sort,
				startAfter,
				endBefore,
			});

			return response.status(200).json({ sentences });
		} catch (error) {
			return next(error);
		}
	}

	async createSentence(request, response, next) {
		try {
			const sentenceData = request.body;

			const sentence = await sentencesService.createSentence(
				sentenceData
			);

			if (request.header("Accept").includes("application/json")) {
				return response.status(201).json(sentence);
			}

			return response.render("view", { sentence });
		} catch (error) {
			return next(error);
		}
	}

	async translateSentence(request, response, next) {
		try {
			const text = request.query.text;

			const translation = await translationService.getEnglishTranslation(
				text
			);

			return response.status(200).json({
				original: text,
				translation,
			});
		} catch (error) {
			return next(error);
		}
	}

	async getSentenceById(request, response, next) {
		try {
			const sentenceId = request.params.sentenceId;

			const sentence = await sentencesService.getSentenceById(sentenceId);

			if (!sentence) {
				return response.status(401).json({
					message: `Sentence with Id ${sentenceId} does not exist`,
				});
			}

			if (request.header("Accept").includes("application/json")) {
				return response.status(200).json(sentence);
			}

			return response.render("view", {
				sentence,
			});
		} catch (error) {
			return next(error);
		}
	}

	async updateSentenceById(request, response, next) {
		try {
			const sentenceId = request.params.sentenceId;

			const sentenceData = request.body;

			const sentence = await sentencesService.updateSentenceById(
				sentenceId,
				sentenceData
			);

			if (!sentence) {
				return response.status(401).json({
					message: `Sentence with Id ${sentenceId} does not exist`,
				});
			}

			if (request.header("Accept").includes("application/json")) {
				return response.status(200).json(sentence);
			}

			return response.redirect(`/sentences/${sentenceId}`);
		} catch (error) {
			return next(error);
		}
	}

	async deleteSentenceById(request, response, next) {
		try {
			const sentenceId = request.params.sentenceId;

			await sentencesService.deleteSentenceById(sentenceId);

			return response.sendStatus(200);
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = SentencesController;
