const fs = require("fs");
const readline = require("readline");
const db = require("../src/loaders/db");

const BATCH_OPERATIONS_LIMIT = 500;

main();

// I'm confused though... the free usage limit is 20K and the dataset contains +20k records...
// Also, the batch.commit method it hangs when the usage has been exceeded, it doesn't throw any errors...

async function main() {
	await readFileAndLoadRecordsToDB(
		__dirname + "/../data/sentences.jsonl.txt"
	);
}

async function readFileAndLoadRecordsToDB(filePath) {
	const file = readline.createInterface({
		input: fs.createReadStream(filePath),
		output: process.stdout,
		terminal: false,
	});

	const sentencesRef = db.collection("sentences");

	let currentBatch = db.batch();
	let currentBatchOperationCount = 0;
	for await (const line of file) {
		const sentence = JSON.parse(line);
		const document = sentencesRef.doc();
		const sentenceVO = getSentenceVO(sentence);

		currentBatch.set(document, sentenceVO);
		++currentBatchOperationCount;

		if (currentBatchOperationCount === BATCH_OPERATIONS_LIMIT) {
			await currentBatch.commit();
			console.count("batch commited");

			currentBatch = db.batch();
			currentBatchOperationCount = 0;
		}
	}

	if (currentBatchOperationCount > 0) {
		await currentBatch.commit();
		console.count("batch commited");
	}
}

function getSentenceVO(sentence) {
	const category = Object.keys(sentence.cats).find(
		(category) => sentence.cats[category] == 1
	);

	return {
		text: sentence.text,
		category,
	};
}
