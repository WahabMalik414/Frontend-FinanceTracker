import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Edit() {
  const location = useLocation();
  const { name: initialName, price: initialPrice, id } = location.state;
  console.log("Initial Name:", initialName);
  console.log("Initial Price:", initialPrice);
  console.log("ID:", id);
  const [newName, setNewName] = useState(initialName);
  const [newPrice, setNewPrice] = useState(initialPrice);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3005/product/${id}`,
        { name: newName, price: newPrice },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Product updated successfully");
        setNewName("");
        setNewPrice("");
        navigate("/products");
      } else {
        console.log("Error updating product");
      }
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 mb-3">
            <h1>Edit</h1>
            <form className="signin-form">
              <div className="form-group">
                <label htmlFor="name">Product Name:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  onChange={(e) => setNewName(e.target.value)}
                  value={newName}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  className="form-control"
                  onChange={(e) => setNewPrice(e.target.value)}
                  value={newPrice}
                  required
                />
              </div>
              <button
                onClick={handleSubmit}
                className="btn btn-primary signin-button"
              >
                Update Product
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/products");
                }}
                className="btn btn-danger signin-button"
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
