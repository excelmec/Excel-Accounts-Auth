import React from "react";
import logo from "../assets/logotext.png";
import "./Login/Login.css";

const NotFound = () => {
  return (
    <div className="new-login-page">
      <div className="time-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
        <div className="orb orb-5"></div>
        <div className="orb orb-6"></div>
        <div className="orb orb-7"></div>
        <div className="orb orb-8"></div>
      </div>

      <img
        src={logo}
        alt="Excel Logo"
        style={{
          width: '80%',
          maxWidth: '1400px',
          height: 'auto',
          filter: 'drop-shadow(0 8px 30px rgba(0,0,0,0.4))',
          position: 'relative',
          zIndex: 10
        }}
      />
    </div>
  );
};

export default NotFound;
