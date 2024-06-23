import "../style/home.css";
import api from "../api";
import { useState, useEffect } from "react";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(null);

  const getTasks = async () => {
    try {
      const res = await api.get("api/todo/");
      setTasks(res.data);
    } catch (err) {
      console.log("Failed to fetch tasks", err);
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await api.delete(`api/todo/delete/${id}/`);
      if (res.status === 204) {
        alert("You've completed your task");
        getTasks(); // Fetch the updated list of tasks after deletion
      } else {
        alert("Failed to delete the task");
      }
    } catch (err) {
      console.log("Something went wrong when deleting the task", err);
      setError(err.message);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const payload = { content: todo }; // Ensure this matches the expected payload
      const res = await api.post("api/todo/", payload);
      if (res.status === 201) {
        console.log("Task is created");
        setTodo("");
        getTasks(); // Fetch the updated list of tasks after creation
      } else {
        console.log("Something went wrong when creating task", res.data);
      }
    } catch (err) {
      console.log(
        "Failed to create task",
        err.response ? err.response.data : err.message
      );
      setError(err.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="container">
          <h1>Todo List</h1>
          <form onSubmit={createTask}>
            <div className="input-container">
              <input
                className="todo-input"
                value={todo}
                required
                name="todo"
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Add a new task..."
              />
              <button type="submit" className="add-button">
                <i className="fa fa-plus-circle"></i>
              </button>
            </div>
          </form>

          <div className="todos-container">
            <ul className="todos">
              {tasks.map((task) => (
                <li key={task.id} className="todo">
                  {task.content}
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
