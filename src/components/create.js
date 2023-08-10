//implement create here
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      setName("");
      setPrice("");
      navigate("/products");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 mb-3">
            <h1>Create a Product</h1>
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
              <button className="btn btn-primary signin-button">
                Create product
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
