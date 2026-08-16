import React from "react";
import logo from "../assets/logotext.png";
import "./Login/Login.css";

const AlreadyLoggedIn = () => {
  return (
    <div className="login-page">
      {/* background grid */}
      <div className="grid-bg" aria-hidden="true" />

      <div className="login-card" role="main">
        {/* Logo */}
        <div className="login-logo-wrap">
          <img src={logo} alt="Excel MEC" className="login-logo" />
        </div>

        {/* Heading */}
        <h1 className="login-title">
          <strong>Already Logged In</strong>
        </h1>
        <p className="login-sub">
          You are currently signed into your account.
        </p>
      </div>
    </div>
  );
};

export default AlreadyLoggedIn;
