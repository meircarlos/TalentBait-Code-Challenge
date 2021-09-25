const axios = require("axios");
const CONSTANTS = require("../../constants");

module.exports = {
	async getEnglishTranslation(text) {
		try {
			const options = {
				params: {
					auth_key: process.env.DEEPL_API_KEY,
					text,
					target_lang: CONSTANTS.DEEPL.EN,
				},
			};

			const response = await axios.post(
				`${CONSTANTS.DEEPL.BASE_URL}/${CONSTANTS.DEEPL.APIv}/translate`,
				null,
				options
			);

			return response.data.translations[0].text;
		} catch (error) {
			console.error(error);

			return null;
		}
	},
};
