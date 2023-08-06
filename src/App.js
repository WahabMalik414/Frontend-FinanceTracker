import { Login } from "./components/login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "./components/products";
import { Navbar } from "./components/layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="login" element={<Login />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
