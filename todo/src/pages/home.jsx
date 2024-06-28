import "../style/home.css";
import api from "../api";
import { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { Link } from "react-router-dom";

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
    console.log("delete button clickked");
    try {
      const res = await api.delete(`api/todo/delete/${id}/`);
      if (res.status === 204) {
        toast.success("You've completed your task");
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
      const payload = { content: todo };
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
                <IoIosAdd />
              </button>
            </div>
          </form>

          <div className="todos-container">
            <ul className="todos">
              {tasks.map((task) => (
                <li key={task.id} className="todo">
                  {task.content}
                  <MdOutlineDelete
                    onClick={() => deleteTask(task.id)}
                    className="delete-icon"
                  ></MdOutlineDelete>
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
