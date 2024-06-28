import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import ProtectedRoute from "./components/protectedRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function Logout() {
  localStorage.clear();
  return <Navigate to="/"></Navigate>;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <ToastContainer></ToastContainer>
                <Home></Home>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/logout" element={<Logout></Logout>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
