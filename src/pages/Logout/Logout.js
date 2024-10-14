import React, {useEffect} from "react";
import logo from "../../assets/logotext.svg";
import Cookies from "universal-cookie";

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
      <h1 className="auth-status-text">Logging out...</h1>
    </div>
  );
};

export default Logout;
