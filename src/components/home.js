import React from "react";

function Home() {
  const welcomeStyle = {
    textAlign: "center",
    fontSize: "24px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={welcomeStyle}>
      Welcome to <strong>Finance recorder</strong> - you can create financial
      records here.
    </div>
  );
}

export default Home;
