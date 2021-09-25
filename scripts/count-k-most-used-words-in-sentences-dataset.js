const fs = require("fs");
const readline = require("readline");
const Heap = require("heap");

const K = 100;

main();

async function main() {
	const wordCounts = await readFileCountingWordOccurrences(
		__dirname + "/../data/sentences.jsonl.txt"
	);

	const minHeap = findKMostUsedWords(wordCounts);

	logKLargestWords(minHeap);
}

async function readFileCountingWordOccurrences(filePath) {
	const file = readline.createInterface({
		input: fs.createReadStream(filePath),
		output: process.stdout,
		terminal: false,
	});

	const wordCounts = {};

	for await (const line of file) {
		const sentence = JSON.parse(line);

		const words = sentence.text.match(/\w+(?:'\w+)*/g) || [];

		for (const word of words) {
			const normalizedWord = normalize(word);

			const currentWordCount = wordCounts[normalizedWord] || 0;

			wordCounts[normalizedWord] = currentWordCount + 1;
		}
	}

	return wordCounts;
}

function normalize(word) {
	return word
		.toLowerCase()
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "");
}

function findKMostUsedWords(wordCounts) {
	const minHeap = new Heap((a, b) => {
		return a.count - b.count;
	});

	for (const word of Object.keys(wordCounts)) {
		const currentWord = {
			word,
			count: wordCounts[word],
		};

		if (minHeap.size() === K) {
			const currentSmallestWord = minHeap.peek();

			if (currentWord.count > currentSmallestWord.count) {
				minHeap.pushpop(currentWord);
			}
		} else {
			minHeap.push(currentWord);
		}
	}

	return minHeap;
}

function logKLargestWords(minHeap) {
	const kLargestWords = [];

	let currentWord = minHeap.pop();
	while (currentWord) {
		kLargestWords.push(currentWord);

		currentWord = minHeap.pop();
	}

	console.log(kLargestWords);
}
