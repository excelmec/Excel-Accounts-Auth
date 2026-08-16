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
          <strong>Logging out...</strong>
        </h1>
        <p className="login-sub">
          Please wait while we securely sign you out.
        </p>
      </div>
    </div>
  );
};

export default Logout;
