import React from "react";
import logo from "../assets/logotext.svg";
const NotFound = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
      }}
    >
      <img src={logo} width="50%" />
    </div>
  );
};

export default NotFound;
