import api from "../api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../style/form.css";
import { toast } from "react-toastify";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for handling errors
  const navigate = useNavigate();

  const name = method === "Login" ? "Login" : "Register";
  const footer = () => {
    console.log("footer calling");
    if (method === "Login") {
      return (
        <>
          <span>
            Don't have an account <Link to="/register">Sign Up</Link>
          </span>
        </>
      );
    } else {
      return (
        <>
          <span>
            Have an account <Link to="/">Login</Link>
          </span>
        </>
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state before making a request

    try {
      const res = await api.post(route, { username, password });
      toast.success("successfully Registered");
      if (method === "Login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        toast.success("successfully Logined");
        navigate("/home");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Unauthorized: Incorrect username or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error message */}
        <input
          type="text"
          className="form-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {footer()}
        <button className="form-button" type="submit" disabled={loading}>
          {loading ? "Loading..." : name}
        </button>
      </form>
    </>
  );
}
export default Form;
