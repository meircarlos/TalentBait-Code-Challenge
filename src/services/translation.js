const deeplAPIRequests = require("../external-api-requests/deepl");

class TranslationService {
	async getEnglishTranslation(text) {
		const translation = await deeplAPIRequests.getEnglishTranslation(text);

		return translation;
	}
}

module.exports = TranslationService;
