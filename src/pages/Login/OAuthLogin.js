import React from "react";
import {
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import http from "../../config/http";
import configs from "../../config/oauth_config";
import logo from "../../assets/logotext.png";
import googleIcon from "../../assets/google_icon.png";
import "./Login.css";
import { cookies } from "../../config/cookie";

const config = configs();

window.addEventListener("error", (event) => {
  console.log("Error: ", event);
});

const setRefreshTokenCookie = (refreshToken) => {
  const oneYear = 60 * 60 * 24 * 365 - 1000;
  cookies.set("refreshToken", refreshToken, { maxAge: oneYear });
};

const Login = () => {
  const onFailure = (error) => {
    try {
      alert(`Error: ${error.error.split("_").join(" ")}`);
    } catch (e) {
      alert("Please enable cookies if you are in private mode.");
    }
    console.log("Google login failure...", error);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      googleResponse({ credential: tokenResponse.access_token }),
    onError: onFailure,
  });

  const googleResponse = (response) => {
    console.log(response);
    if (!response.credential) {
      console.error("Unable to get tokenId from Google", response);
      return;
    }

    const redirectUri = decodeURIComponent(
      localStorage.getItem("redirect_to") || "https://excelmec.org"
    );

    if (
      process.env.REACT_APP_ENVIRONMENT === "development" &&
      redirectUri === "copy_g_access_token"
    ) {
      prompt("Copy the google access token", response.credential);
      localStorage.removeItem("redirect_to");
      return;
    }

    http
      .post(config.redirectUrl, { accessToken: response.credential })
      .then((user) => {
        const { accessToken, refreshToken } = user;
        if (
          !(accessToken && refreshToken) ||
          !(typeof accessToken === "string" && typeof refreshToken === "string")
        ) {
          alert("Invalid JWT");
          return;
        }

        setRefreshTokenCookie(refreshToken);
        localStorage.setItem("refreshToken", refreshToken);

        if (
          process.env.REACT_APP_ENVIRONMENT === "development" &&
          redirectUri === "copy_access_token"
        ) {
          prompt("Copy the access token", accessToken);
          localStorage.removeItem("redirect_to");
          return;
        }

        if (
          process.env.REACT_APP_ENVIRONMENT === "development" &&
          redirectUri === "copy_refresh_token"
        ) {
          prompt("Copy the refresh token", refreshToken);
          localStorage.removeItem("redirect_to");
          return;
        }

        debugger;
        if (redirectUri) {
          localStorage.removeItem("redirect_to");
          const redirectUrl = new URL(redirectUri);
          const redirectParams = new URLSearchParams(redirectUrl.search);
          if (redirectParams.has("refreshToken")) redirectParams.delete("refreshToken");
          redirectParams.append("refreshToken", refreshToken);
          redirectUrl.search = redirectParams.toString();
          window.location.href = redirectUrl.toString();
        } else {
          window.location.href = "https://accounts.excelmec.org";
        }
      })
      .catch((err) => console.log("error occurred...", err));
  };

  React.useEffect(() => {
    const searchString = window.location.href.slice(
      window.location.href.indexOf("?")
    );
    const urlParams = new URLSearchParams(searchString);
    const redirectUrl = urlParams.get("redirect_to");
    const referralCode = urlParams.get("referral");
    localStorage.setItem("redirect_to", decodeURIComponent(redirectUrl));
    if (referralCode) localStorage.setItem("referralCode", referralCode);
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
          <strong>Welcome</strong>
        </h1>
        <p className="login-sub">
          Sign in to continue your journey across the Multiverse
        </p>

        {/* Divider */}
        <div className="login-divider" aria-hidden="true">
          <span>continue with</span>
        </div>

        {/* Google Button */}
        <button
          id="google-signin-btn"
          className="google-login-button"
          onClick={() => googleLogin()}
          aria-label="Sign in with Google"
        >
          <div className="g-icon-circle">
            <img src={googleIcon} alt="" className="google-icon" aria-hidden="true" />
          </div>
          <span className="btn-label">Continue with Google</span>
        </button>



      </div>
    </div>
  );
};

const LoginComponent = () => (
  <GoogleOAuthProvider clientId={config.clientId}>
    <Login />
  </GoogleOAuthProvider>
);

export default LoginComponent;
