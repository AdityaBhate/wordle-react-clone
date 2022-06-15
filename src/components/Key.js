import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ value, bigKey, disabled }) {
	const { onSelectLetter, onDelete, onEnter } = useContext(AppContext);
	const selectLetter = () => {
		if (value === "Enter") {
			onEnter();
		} else if (value === "delete") {
			onDelete();
		} else {
			onSelectLetter(value);
		}
	};
	return (
		<div
			className='key'
			id={bigKey ? "big" : disabled && "disabled"}
			onClick={selectLetter}>
			{value}
		</div>
	);
}

export default Key;
