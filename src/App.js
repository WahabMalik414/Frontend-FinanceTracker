import React from "react";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import Products from "./components/products";
import Protected from "./components/protected";
import SignUp from "./components/register";
import Create from "./components/create";
import Edit from "./components/Edit";
import Home from "./components/home";
function App() {
  return (
    <BrowserRouter>
      <Home />
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="products" element={<Protected Component={Products} />} />
        <Route path="create" element={<Protected Component={Create} />} />
        <Route path="edit" element={<Protected Component={Edit} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
