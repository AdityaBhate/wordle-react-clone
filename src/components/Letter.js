import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ postion, attempt }) {
	const { board, correctWord, currAttempt, disabledLetter, setDisabledLetter } =
		useContext(AppContext);
	const letter = board[attempt][postion];

	const correct = correctWord.toUpperCase()[postion] === letter;
	const almost =
		!correct && letter !== "" && correctWord.toUpperCase().includes(letter);
	const letterState =
		currAttempt.attempt > attempt &&
		(correct ? "correct" : almost ? "almost" : "error");

	useEffect(() => {
		if (letter !== "" && !correct && !almost) {
			setDisabledLetter((prev) => [...prev, letter]);
		}
	}, [currAttempt.attempt]);
	return (
		<div className='letter' id={letterState}>
			{letter}
		</div>
	);
}

export default Letter;
