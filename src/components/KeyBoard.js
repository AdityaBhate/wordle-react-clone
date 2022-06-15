import React, { useEffect, useCallback, useContext } from "react";
import { AppContext } from "../App";
import Key from "./Key";

export default function KeyBoard() {
	const {
		onEnter,
		onDelete,
		onSelectLetter,
		disabledLetter,
		setDisabledLetter,
	} = useContext(AppContext);
	const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
	const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
	const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
	const handleKeyboard = useCallback((event) => {
		if (event.key === "Enter") {
			onEnter();
		} else if (event.key === "Backspace") {
			onDelete();
		} else {
			keys1.forEach((key) => {
				if (event.key.toUpperCase() === key) {
					onSelectLetter(key);
				}
			});
			keys2.forEach((key) => {
				if (event.key.toUpperCase() === key) {
					onSelectLetter(key);
				}
			});
			keys3.forEach((key) => {
				if (event.key.toUpperCase() === key) {
					onSelectLetter(key);
				}
			});
		}
	});
	useEffect(() => {
		document.addEventListener("keydown", handleKeyboard);
		return () => {
			document.removeEventListener("keydown", handleKeyboard);
		};
	}, [handleKeyboard]);
	return (
		<div className='keyboard' onKeyDown={handleKeyboard}>
			<div className='line1'>
				{keys1.map((key) => {
					return <Key value={key} disabled={disabledLetter.includes(key)} />;
				})}
			</div>
			<div className='line2'>
				{keys2.map((key) => {
					return <Key value={key} disabled={disabledLetter.includes(key)} />;
				})}
			</div>
			<div className='line3'>
				<Key value={"Enter"} bigKey />
				{keys3.map((key) => {
					return <Key value={key} disabled={disabledLetter.includes(key)} />;
				})}
				<Key value={"delete"} bigKey />
			</div>
		</div>
	);
}
