import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(0);

  const fetchData = async (req, res) => {
    try {
      console.log("In try catch");
      const res = await axios({
        method: "post",
        url: "http://localhost:3005/user/validate",
        withCredentials: true,
      });
      console.log(res.status);
      if (res.status === 200) {
        setIsAuthenticated(1);
      } else {
        setIsAuthenticated(0);
        navigate("/login");
      }
    } catch (error) {
      setIsAuthenticated(0);
      navigate("/login");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
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
            <h1>protected</h1>
            <Component />
          </>
        ) : null // No need to render anything here
      }
    </div>
  );
}

export default Protected;
