import "./Logout.css";
import React, {useEffect} from "react";
import logo from "../../assets/logotext.png";
import Cookies from "universal-cookie";
import "../Login/Login.css";

const cookies = new Cookies(null, {
  httpOnly: false,
  secure: false,
  sameSite: "strict",
});

const Logout = () => {
  useEffect(() => {
    localStorage.clear();
    cookies.remove("refreshToken");
    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const origRedirectUrl =
        urlParams.get("redirect_to") || "https://excelmec.org";
      console.log("Successfully logged out, logging out of accounts as well");

      const AccFrontendUrl = process.env.REACT_APP_ACC_FRONTEND_BASE;
      if (!AccFrontendUrl) {
        console.log("No AccFrontendUrl found", origRedirectUrl);
        window.location.href = origRedirectUrl;
        return;
      }

      const AccFrontendUrlObj = new URL(AccFrontendUrl);
      AccFrontendUrlObj.pathname = "/logout";
      AccFrontendUrlObj.searchParams.append("redirect_to", origRedirectUrl);

      console.log("Redirecting to", AccFrontendUrlObj.toString());

      window.location.href = AccFrontendUrlObj.toString();
    }, 1500);
  }, []);

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
          <h1 className="logout-text">Logging out...</h1> 
        </div>
      </div>
    </div>
  );
};

export default Logout;
