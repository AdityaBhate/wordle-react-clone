import { React, useState, createContext, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import KeyBoard from "./components/KeyBoard";
import GameOver from "./components/GameOver";
import { boardDefault, generateWordSet } from "./Words.js";

export const AppContext = createContext();

function App() {
	const [board, setBoard] = useState(boardDefault);
	const [currAttempt, setCurrAttempt] = useState({ attempt: 0, position: 0 });
	const [wordSet, setWordSet] = useState(new Set());
	const [disabledLetter, setDisabledLetter] = useState([]);
	const [correctWord, setCorrectWord] = useState("");
	const [gameOver, setGameOver] = useState({
		gameOver: false,
		guessedWord: false,
	});

	useEffect(() => {
		generateWordSet().then((words) => {
			setWordSet(words.wordsSet);
			setCorrectWord(words.todaysWord);
		});
	}, []);

	const onSelectLetter = (value) => {
		if (currAttempt.position > 4) {
			return;
		}
		const newBoard = [...board];
		newBoard[currAttempt.attempt][currAttempt.position] = value;
		setBoard(newBoard);
		setCurrAttempt({ ...currAttempt, position: currAttempt.position + 1 });
	};
	const onDelete = () => {
		if (currAttempt.position === 0) {
			return;
		}
		const newBoard = [...board];
		newBoard[currAttempt.attempt][currAttempt.position - 1] = "";
		setBoard(newBoard);
		setCurrAttempt({ ...currAttempt, position: currAttempt.position - 1 });
	};
	const onEnter = () => {
		if (currAttempt.position !== 5) return;
		let currWord = "";
		for (let i = 0; i < 5; i++) {
			currWord += board[currAttempt.attempt][i];
		}
		if (wordSet.has(currWord.toLowerCase())) {
			setCurrAttempt({ attempt: currAttempt.attempt + 1, position: 0 });
		} else {
			alert("Word not found");
		}
		if (currWord === correctWord.toUpperCase()) {
			setGameOver({ gameOver: true, guessedWord: true });
			return;
		}
		if (currAttempt.attempt === 5) {
			setGameOver({ gameOver: true, guessedWord: false });
		}
	};

	return (
		<div className='App'>
			<nav>
				<h1>Wordle</h1>
			</nav>
			<AppContext.Provider
				value={{
					board,
					setBoard,
					currAttempt,
					setCurrAttempt,
					onSelectLetter,
					onDelete,
					onEnter,
					correctWord,
					disabledLetter,
					setDisabledLetter,
					gameOver,
					setGameOver,
				}}>
				<div className='game'>
					<Board />
					{gameOver.gameOver ? <GameOver /> : <KeyBoard />}
				</div>
			</AppContext.Provider>
		</div>
	);
}

export default App;
