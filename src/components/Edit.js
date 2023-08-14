import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        `https://financewapp-589026a6b4b3.herokuapp.com/product/${id}`,
        { name: newName, price: newPrice },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setNewName("");
        setNewPrice("");
        navigate("/products");
        toast.success("Updated successfully!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Server error: Unathorized Access", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setNewName("");
        setNewPrice("");
        navigate("/login");
      }
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
              <div className="mt-3">
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary signin-button me-2"
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
