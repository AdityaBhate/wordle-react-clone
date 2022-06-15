import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
	const { gameOver, correctWord, currAttempt } = useContext(AppContext);
	return (
		<div className='gameOver'>
			<h2>
				{gameOver.guessedWord
					? "You guessed the word 😎"
					: "You falied to guess the word 😖"}
			</h2>
			<h1> Correct Word : {correctWord}</h1>
			{gameOver.guessedWord && (
				<h3> You guessed in the word in {currAttempt.attempt} attempts</h3>
			)}
			<button
				className='playagain'
				onClick={() => {
					window.location.reload();
				}}>
				Play Again
			</button>
		</div>
	);
}

export default GameOver;
