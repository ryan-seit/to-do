import "./App.css";
import React, { useState, useReducer } from "react";
// import { findAllByTestId } from "@testing-library/react";

// To do component, if object `isDone` is true, check box
const Todo = ({ todo, index, isDone, deleteTodo }) => {
	const [content, setContent] = useState([todo.content]);
	let edit = "false";

	const handleDoubleClick = e => {
		edit = "true";
		e.preventDefault();
		setContent(e.target.value);
	};

	// console.log("Todo component", content);
	return (
		<div
			className='todo'
			style={{ textDecoration: todo.isDone ? "line-through" : "" }}
		>
			<input
				type='checkbox'
				id={todo.id}
				name={content}
				checked={todo.isDone}
				onChange={() => isDone(index)}
			/>
			<label
				value={content}
				contentEditable={edit}
				onDoubleClick={e => handleDoubleClick(e)}
				className='content'
			>
				{content}
			</label>
			<button onClick={() => deleteTodo(index)}>X</button>
		</div>
	);
};

// New todo form component
const TodoInput = ({ addTodo }) => {
	const [value, setValue] = useState("");
	const handleSubmit = event => {
		event.preventDefault();
		if (!value) return;
		addTodo(value);
		setValue("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				className='input'
				value={value}
				placeholder='What needs to be done?'
				onChange={event => setValue(event.target.value)}
			/>
		</form>
	);
};

function App() {
	// Testing state (remove for production)
	const [todos, setTodos] = useState([
		{
			id: 101,
			content: "To Do Item 1",
			isDone: false,
		},
		{
			id: 102,
			content: "To Do Item 2",
			isDone: false,
		},
		{
			id: 103,
			content: "To Do Item 3",
			isDone: true,
		},
	]);

	console.log("todos", todos);

	// Filter todos by isDone value
	const filterReducer = (state, action) => {
		switch (action.type) {
			case "SHOW_ALL":
				return "ALL";
			case "SHOW_ACTIVE":
				return "ACTIVE";
			case "SHOW_COMPLETED":
				return "COMPLETED";
			case "CLEAR_COMPLETED":
				return "CLEAR";
			default:
				throw new Error();
		}
	};

	const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");

	const filteredTodos = todos.filter(todo => {
		if (filter === "ALL") {
			return true;
		}
		if (filter === "ACTIVE" && !todo.isDone) {
			return true;
		}
		if (filter === "COMPLETED" && todo.isDone) {
			return true;
		}
		if (filter === "CLEAR" && todo.isDone) {
			return true;
		}
		return false;
	});

	const handleShowAll = () => {
		dispatchFilter({ type: "SHOW_ALL" });
	};

	const handleShowActive = () => {
		dispatchFilter({ type: "SHOW_ACTIVE" });
	};

	const handleShowCompleted = () => {
		dispatchFilter({ type: "SHOW_COMPLETED" });
	};

	// Generate random number for new objects id field
	let randomNum = Math.floor(Math.random() * 100 + 1);

	// Create todo object
	const addTodo = content => {
		const newTodos = [...todos, { id: randomNum, content, isDone: false }];
		setTodos(newTodos);
	};

	// TODO: Edit todo object
	// const editTodo = content => {
	// 	const newTodos = [...todos]
	// }

	// Active todo count
	const activeTodoCount = () => {
		let activeTodos = 0;
		todos.forEach(todo => {
			if (!todo.isDone) {
				activeTodos++;
			}
		});
		return activeTodos;
	};

	// Completed todo count
	const toggleClearCompleted = () => {
		let completedTodos = 0;
		todos.forEach(todo => {
			if (todo.isDone) {
				completedTodos++;
			}
		});
		if (completedTodos === 0) {
			return false;
		} else {
			return true;
		}
	};

	// Mark todo as complete
	const isDone = index => {
		const newTodos = [...todos];
		newTodos[index].isDone = !newTodos[index].isDone;
		setTodos(newTodos);
	};

	// Mark all todos as complete
	const allDone = index => {
		const newTodos = [...todos];
		newTodos.forEach(todo => (todo.isDone = true));
		setTodos(newTodos);
	};

	// Delete todo object
	const deleteTodo = index => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	// Push active todos to new array, then update state with new array
	const handleClearCompleted = () => {
		const newTodos = [];
		todos.forEach(todo => {
			if (!todo.isDone) {
				newTodos.push(todo);
			}
		});
		setTodos(newTodos);
	};

	return (
		<div className='App'>
			<div className='todo-header'>
				<h1>todos</h1>
			</div>
			<button type='button' onClick={allDone}>
				All
			</button>
			<TodoInput addTodo={addTodo} />
			<div className='todo-list'>
				{filteredTodos.map((todo, index) => (
					<Todo
						key={index}
						index={index}
						todo={todo}
						isDone={isDone}
						deleteTodo={deleteTodo}
					/>
				))}
			</div>
			<div>
				{console.log(activeTodoCount())}
				{console.log(toggleClearCompleted())}
				{activeTodoCount()} items left
				<button type='button' onClick={handleShowAll}>
					All
				</button>
				<button type='button' onClick={handleShowActive}>
					Active
				</button>
				<button type='button' onClick={handleShowCompleted}>
					Completed
				</button>
				{toggleClearCompleted() ? (
					<button type='button' onClick={handleClearCompleted}>
						Clear Completed
					</button>
				) : null}
			</div>
		</div>
	);
}

export default App;
