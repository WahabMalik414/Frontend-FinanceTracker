import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = Cookies.get("access-token");
    if (!login) {
      navigate("/login");
    }
  });
  return (
    <div>
      <h1>protected</h1>
      <Component />
    </div>
  );
}

export default Protected;
