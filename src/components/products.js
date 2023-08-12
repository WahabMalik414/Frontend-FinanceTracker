import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Create from "./create";
import Edit from "./Edit";

function Products() {
  const [productsData, setProductsData] = useState({
    products: [],
    totalSum: 0,
  });
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
        alert("Deleted successfully!");
        fetchProducts();
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert("Product not found!");
      } else if (error.response.status === 401) {
        alert("Unauthorized access!");
      }
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3005/user/logout",
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      alert("Some error occurred!");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3005/products",
        withCredentials: true,
      });
      if (response.status === 200) {
        setProductsData(response.data);
      }
    } catch (error) {
      alert("404 not found!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="className=w-75 mt-4 mb-4">
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
          onClick={handleLogout}
        >
          Logout
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productsData.products.map((product, index) => {
              return (
                <tr key={index}>
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
        <div className="mt-2 text-center">
          <strong className="d-inline-block me-3">Total Salary:</strong> Rs.{" "}
          {productsData.salary}
          <strong className="d-inline-block mx-3">
            Total Expenditure:
          </strong>{" "}
          Rs. {productsData.totalSum}
          <strong className="d-inline-block mx-3">
            Total Saving:
          </strong> Rs. {productsData.salary - productsData.totalSum}
        </div>
      </div>
    </div>
  );
}

export default Products;
