import React from "react";

// Individual to do item
export const ToDoListItem = props => {
	return (
		<li>
			<input
				type='checkbox'
				id={props.id}
				name={props.content}
				value={props.isDone}
			/>
			<label for={props.content}>{props.content}</label>
			<button>X</button>
		</li>
	);
};
