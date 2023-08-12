import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
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
        url: "http://localhost:3005/user/validate",
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
        toast.success("Server error: Unathorized", {
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

  useEffect(() => {
    checkValidation();
  }, []);

  /*
  useEffect(() => {
    console.log("here");
    const checkToken = async () => {
      try {
        console.log("In try catch");
        const res = await axios({
          method: "post",
          url: "http://localhost:3005/user/validate",
          withCredentials: true,
        });
        console.log("out of try catch!");
        console.log(res);
        if (res.status === 200) {
          console.log("Authenticated!");
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          console.log("Not Authenticated!");
          navigate("/login"); // Redirect to login page
        }
      } catch (error) {
        console.log("encountered error!");
        setIsAuthenticated(false);
        navigate("/login"); // Redirect to login page
      }
    };
    checkToken();
  }, []);

  console.log(isAuthenticated);
*/
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
