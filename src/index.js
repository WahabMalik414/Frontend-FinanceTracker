import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout";
import { Login } from "./components/login";
import Products from "./components/products";
import Home from "./components/home";
import Protected from "./components/protected";
import SignUp from "./components/register";
import Create from "./components/create";
import Edit from "./components/Edit";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="products" element={<Protected Component={Products} />} />
        <Route path="create" element={<Protected Component={Create} />} />
        <Route path="edit" element={<Protected Component={Edit} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
