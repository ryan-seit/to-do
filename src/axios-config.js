import axios from "axios";

const instance = axios.create({
	baseURL: "https://todo-app-rs.herokuapp.com/todos",
});

export default instance;
