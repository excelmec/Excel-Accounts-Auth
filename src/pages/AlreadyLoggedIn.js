import React from "react";
import logo from "../assets/logotext.png";
import "./Login/Login.css";

const AlreadyLoggedIn = () => {
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

            <div className="login-container">
                <div className="logo-container">
                    <img
                        src={logo}
                        alt="Excel Logo"
                        className="login-logo"
                    />
                </div>

                <div className="login-content">
                    <h1 className="login-title">Already Logged In</h1>
                </div>
            </div>
        </div>
    );
};

export default AlreadyLoggedIn;
