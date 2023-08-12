//implement create here
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Create() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3005/product",
        withCredentials: "true",
        data: { name, price },
      });
      if (response.status === 200) {
        setName("");
        setPrice("");
        navigate("/products");
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert("Server error: Can't create");
        setName("");
        setPrice("");
        navigate("/login");
      } else if (error.response.status === 401) {
        alert("Server error: Unathorized Access");
        setName("");
        setPrice("");
        navigate("/login");
      }
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 mb-3">
            <h2 className="text-center">Create a product</h2>
            <form onSubmit={handleSubmit} className="signin-form">
              <div className="form-group">
                <label htmlFor="name">Product Name:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
              </div>
              <div className="mt-2">
                <button className="btn btn-primary signin-button me-2">
                  Create
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/products");
                  }}
                  className="btn btn-danger cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
