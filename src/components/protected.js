import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(0);

  const checkValidation = async (req, res) => {
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND}/user/validate`,
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAuthenticated(1);
      } else {
        setIsAuthenticated(0);
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setIsAuthenticated(0);
        navigate("/login");
        toast.error("Server error: Unathorized", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    checkValidation();
  }, []);

  return (
    <div>
      {
        isAuthenticated ? (
          <>
            <Component />
          </>
        ) : null // No need to render anything here
      }
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Protected;
