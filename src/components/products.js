import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Create from "./create";
import Edit from "./Edit";
function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/create");
  };
  const handleEdit = (name, price, id) => {
    const product = {
      name: name,
      price: price,
      id: id,
    };
    navigate("/edit", { state: product });
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `http://localhost:3005/product/${id}`,
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Deleted");
        navigate("/products");
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async (req, res) => {
    console.log("logging out!");
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3005/user/logout",
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Logged out!");
        navigate("/login");
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3005/products",
        withCredentials: true,
      });
      setProducts(response.data); // Extract response data
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array to fetch products only once

  return (
    <>
      <h2 className="text-center mb-3">List of Products</h2>

      <button
        type="button"
        className="btn btn-primary me-2"
        onClick={handleCreate}
      >
        Create
      </button>

      <button
        type="button"
        className="btn btn-outline-primary me-2"
        onClick={fetchProducts}
      >
        Refresh
      </button>
      <button
        type="button"
        className="btn btn-outline-primary me-2"
        onClick={
          handleLogout
          /*
          Cookies.remove("access-token");
          navigate("/login");
          */
        }
      >
        Logout
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>Rs. {product.price}</td>
                <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                  <button
                    type="button"
                    onClick={() => {
                      handleEdit(product.name, product.price, product._id);
                    }}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await handleDelete(product._id);
                      fetchProducts();
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Products;
