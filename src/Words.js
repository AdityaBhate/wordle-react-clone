import wordBank from "./wordle-bank.txt";

export const boardDefault = [
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
];

export const generateWordSet = async () => {
	let wordsSet;
	let todaysWord;
	await fetch(wordBank)
		.then((response) => response.text())
		.then((result) => {
			const wordsArray = result.split("\n");
			todaysWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
			wordsSet = new Set(wordsArray);
			console.log(todaysWord);
		});

	return { wordsSet, todaysWord };
};
