import React from "react";
import { Navigate } from "react-router-dom";

function Protected(props) {
  const { Component } = props;

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "1";

  if (isAuthenticated) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default Protected;
