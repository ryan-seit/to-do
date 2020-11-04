import "./App.css";
import React, { useState, useReducer, useEffect } from "react";
import axios from "./axios-config";

// To do component, if object `isDone` is true, check box
const Todo = ({
	content,
	id,
	isDone,
	markComplete,
	deleteTodo,
	todos,
	setTodos,
}) => {
	const handleOnChange = (text, id) => {
		const newTodos = [...todos];
		let updatedContent = text;
		newTodos.forEach(todo => {
			if (todo.id === id) {
				todo.content = updatedContent;
			}
			axios
				.put(`/${id}`, {
					content: todo.content,
				})
				.then(res => console.log(res))
				.catch(err => console.error(err));
		});
		setTodos(newTodos);
	};

	return (
		<div className='entry todo-list__entry' key={id}>
			<input
				type='checkbox'
				className='checkbox entry__checkbox'
				id={id}
				name={content}
				checked={isDone}
				onChange={() => markComplete(id, isDone)}
			/>
			<input
				type='text'
				className='label entry__label'
				value={content}
				style={{ textDecoration: isDone === true ? "line-through" : "" }}
				onChange={e => handleOnChange(e.target.value, id)}
			/>
			<button onClick={() => deleteTodo(id)} className='button entry__button'>
				x
			</button>
		</div>
	);
};

const TodoInput = props => {
	const [value, setValue] = useState("");
	const handleSubmit = event => {
		event.preventDefault();
		if (!value) return;
		axios
			.post("", {
				content: value.toString(),
				isDone: false,
			})
			.then(res => {
				props.addTodo(res.data);
				console.log("POST RESPONSE", res);
			})
			.catch(err => {
				console.log("POST ERROR", err);
			});
		setValue("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<button
				type='button'
				className='button todo-form__button'
				id='chevron'
				onClick={props.allDone}
			>
				>
			</button>
			<input
				type='text'
				className='input todo-header__input'
				value={value}
				placeholder='What needs to be done?'
				onChange={e => setValue(e.target.value)}
			/>
		</form>
	);
};

function App() {
	const [todos, setTodos] = useState([]);

	// Fetch todos from API
	useEffect(() => {
		const fetchData = async () => {
			const res = await axios();
			setTodos(res.data);
		};
		fetchData().catch(err => console.error(err));
	}, []);

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

	// Filter: show all todos
	const handleShowAll = () => {
		dispatchFilter({ type: "SHOW_ALL" });
	};

	// Filter: show all active todos
	const handleShowActive = () => {
		dispatchFilter({ type: "SHOW_ACTIVE" });
	};

	// Filter: show all completed todos
	const handleShowCompleted = () => {
		dispatchFilter({ type: "SHOW_COMPLETED" });
	};

	// Create todo object
	const addTodo = data => {
		const newTodos = [
			...todos,
			{ id: data.id, content: data.content, isDone: data.isDone },
		];
		setTodos(newTodos);
	};

	// TODO: Edit todo object
	const editTodo = (id, content) => {
		const newTodos = [...todos];
		todos.forEach(todo => {
			if (todo.id === id) {
				todo.content = content;
				axios
					.put(`/${id}`, {
						content: content.toString(),
					})
					.then(res => {
						console.log("edit todo", res.data);
					})
					.catch(err => {
						console.error(err);
					});
			}
			setTodos(newTodos);
		});
	};

	// Active todo number
	const activeTodoCount = () => {
		let activeTodos = 0;
		todos.forEach(todo => {
			if (!todo.isDone) {
				activeTodos++;
			}
		});
		return activeTodos;
	};

	// Toggle 'Clear Completed' button
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
	const markComplete = (id, isDone) => {
		const newTodos = [...todos];
		newTodos.forEach(todo => {
			if (todo.id === id && todo.isDone !== true) {
				axios
					.put(`/${id}`, {
						isDone: "true",
					})
					.then(res => {
						console.log("PUT", res.data);
						todo.isDone = true;
						setTodos(newTodos);
					})
					.catch(err => console.error(err));
			} else if (todo.id === id && todo.isDone !== false) {
				axios
					.put(`/${id}`, {
						isDone: "false",
					})
					.then(res => {
						console.log("PUT", res.data);
						todo.isDone = false;
						setTodos(newTodos);
					})
					.catch(err => console.error(err));
			}
		});
	};

	// Mark all todos as complete
	const allDone = () => {
		const newTodos = [...todos];
		newTodos.forEach(todo => {
			if (todo.isDone !== true) {
				axios
					.put(`/${todo.id}`, {
						isDone: "true",
					})
					.then(res => {
						console.log("PUT", res.data);
					})
					.catch(err => console.error(err));
			}
			todo.isDone = true;
			setTodos(newTodos);
		});
	};

	// Delete todo object
	const deleteTodo = id => {
		const newTodos = [];
		todos.forEach(todo => {
			if (todo.id !== id) {
				newTodos.push(todo);
			} else if (todo.id === id) {
				axios
					.delete(`/${id}`)
					.then(res => {
						console.log("deletetodo", res.data);
						setTodos(newTodos);
					})
					.catch(err => {
						console.error(err);
					});
			}
		});
	};

	// Clear all completed todos
	const handleClearCompleted = () => {
		const newTodos = [];
		todos.forEach(todo => {
			if (!todo.isDone) {
				newTodos.push(todo);
			} else if (todo.isDone) {
				axios
					.delete(`/${todo.id}`)
					.then(res => {
						console.log("deletetodo", res.data);
					})
					.catch(err => {
						console.error(err);
					});
			}
		});
		setTodos(newTodos);
	};

	return (
		<div className='App'>
			<div className='title todo-header__title'>
				<h1>todos</h1>
			</div>
			<TodoInput addTodo={addTodo} allDone={allDone} />
			<div className='todo-list'>
				{filteredTodos.map(todo => (
					<Todo
						key={todo.id}
						id={todo.id}
						content={todo.content}
						editTodo={e => editTodo(todo.id)}
						isDone={todo.isDone}
						markComplete={e => markComplete(todo.id)}
						deleteTodo={e => deleteTodo(todo.id)}
						todos={todos}
						setTodos={setTodos}
					/>
				))}
			</div>
			<div className='todo-footer'>
				<label className='label todo-footer__label'>
					{activeTodoCount()} items left
				</label>
				<button
					type='button'
					className='button button-all todo-footer__button'
					onClick={handleShowAll}
				>
					All
				</button>
				<button
					type='button'
					className='button button-active todo-footer__button'
					onClick={handleShowActive}
				>
					Active
				</button>
				<button
					type='button'
					className='button button-completed todo-footer__button'
					onClick={handleShowCompleted}
				>
					Completed
				</button>
				{toggleClearCompleted() ? (
					<button
						type='button'
						className='button button-clear todo-footer__button'
						onClick={handleClearCompleted}
					>
						Clear Completed
					</button>
				) : null}
			</div>
		</div>
	);
}

export default App;
