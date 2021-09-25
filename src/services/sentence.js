const db = require("../loaders/db");

const sentencesCollection = db.collection("sentences");

class SentenceService {
	async getAllSentences({ limit, category, sort, startAfter, endBefore }) {
		let query = sentencesCollection;

		// The category filter is prioritized over sorting
		if (category) {
			query = query.where("category", "==", category);
		} else {
			query = query.orderBy("category", sort);
		}

		// The startAfter (next page) will always be prioritized in case both are provided
		const sentenceId = endBefore ? endBefore : startAfter;

		if (sentenceId) {
			const sentenceRef = sentencesCollection.doc(sentenceId);
			const paginationDocument = await sentenceRef.get(sentenceId);

			if (endBefore) {
				query = query.endBefore(paginationDocument);
			} else if (startAfter) {
				query = query.startAfter(paginationDocument);
			}
		}

		if (endBefore) {
			query = query.limitToLast(limit);
		} else {
			query = query.limit(limit);
		}

		const snapshot = await query.get();

		let documents = snapshot.docs.map((document) => ({
			id: document.id,
			...document.data(),
		}));

		return documents;
	}

	async getSentenceById(sentenceId) {
		const sentenceRef = sentencesCollection.doc(sentenceId);
		const document = await sentenceRef.get(sentenceId);

		if (!document.exists) {
			return null;
		}

		return {
			id: sentenceId,
			...document.data(),
		};
	}

	async createSentence(sentenceData) {
		const document = await sentencesCollection.add(sentenceData);

		return {
			id: document.id,
			...sentenceData,
		};
	}

	async updateSentenceById(sentenceId, sentenceData) {
		const sentenceRef = sentencesCollection.doc(sentenceId);

		try {
			await sentenceRef.update(sentenceData);
		} catch (error) {
			if (error.code === 5) {
				return null;
			} else {
				console.error(error);
			}
		}

		return {
			id: sentenceId,
			...sentenceData,
		};
	}

	async deleteSentenceById(sentenceId) {
		const sentenceRef = sentencesCollection.doc(sentenceId);

		await sentenceRef.delete();

		return true;
	}
}

module.exports = SentenceService;
