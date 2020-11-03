import React from "react";
import { ToDoCounter } from "./ToDoCounter";
import { ToDoStatus } from "./ToDoStatus";
import { ToDoClear } from "./ToDoClear";

// Display ToDoCounter, ToDoStatus buttons and ToDoClear button
export const ToDoFooter = props => {
	return (
		<div>
			<ToDoCounter count={props.count} />
			<ToDoStatus
				all={props.all}
				active={props.active}
				completed={props.completed}
			/>
			<ToDoClear />
		</div>
	);
};
