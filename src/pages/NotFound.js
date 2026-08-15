import React from "react";
import logo from "../assets/logotext.png";
import "./Login/Login.css";

const NotFound = () => {
  return (
    <div className="login-page">
      <div className="grid-bg" aria-hidden="true" />
      <img
        src={logo}
        alt="Excel MEC"
        style={{
          width: '100%',
          maxWidth: '1100px',
          height: 'auto',
          padding: '32px',
          position: 'relative',
          zIndex: 10,
          filter: 'drop-shadow(0 4px 32px rgba(90,30,71,0.35))',
        }}
      />
    </div>
  );
};

export default NotFound;
