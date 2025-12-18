import React, {useState} from "react";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import http from "../../config/http";
import configs from "../../config/oauth_config";
import logo from "../../assets/logotext.png";
import googleIcon from "../../assets/google_icon.png";
import "./Login.css";
import {cookies} from "../../config/cookie";

const config = configs();

window.addEventListener("error", (event) => {
  console.log("Error: ", event);
  alert("Error event msg: ", event.message);
});

const setRefreshTokenCookie = (refreshToken) => {
  console.log("Setting refresh token cookie...");
  const oneYear = 60 * 60 * 24 * 365 - 1000;
  cookies.set("refreshToken", refreshToken, {
    maxAge: oneYear,
  });
};

const Login = () => {
  const [mobile, setMobile] = useState(false);
  const onFailure = (error) => {
    // alert(JSON.stringify(error));
    try {
      alert(`Error: ${error.error.split("_").join(" ")}`);
    } catch (e) {
      alert("Please enable cookies if you are in private mode. ");
    }
    console.log("Google login failure...", error);
  };
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      googleResponse({credential: tokenResponse.access_token}),
  });
  const googleResponse = (response) => {
    console.log(response);
    if (!response.credential) {
      console.error("Unable to get tokenId from Google", response);
      return;
    }

    /**
     * This is the redirectUri to which the user
     * will be redirected after successful login.
     * eg: excel main page, account page, etc.
     */
    const redirectUri = decodeURIComponent(
      localStorage.getItem("redirect_to") || "https://excelmec.org"
    );
    console.log(redirectUri);

    /**
     * This is to test the signup flow in development,
     * without triggering it from Frontend.
     */
    if (
      process.env.REACT_APP_ENVIRONMENT === "development" &&
      redirectUri &&
      redirectUri === "copy_g_access_token"
    ) {
      prompt("Copy the google access token", response.credential);
      localStorage.removeItem("redirect_to");
      return;
    }

    http
      .post(config.redirectUrl, {accessToken: response.credential})
      .then((user) => {
        // console.log('user: ', user);
        const {accessToken, refreshToken} = user;
        if (
          !(accessToken && refreshToken) ||
          !(typeof accessToken === "string" && typeof refreshToken === "string")
        ) {
          console.log("Error...invalid jwt");
          alert("Invalid JWT");
          return;
        }

        console.log("Successfull", accessToken);

        setRefreshTokenCookie(refreshToken);
        localStorage.setItem("refreshToken", refreshToken);

        if (
          process.env.REACT_APP_ENVIRONMENT === "development" &&
          redirectUri &&
          redirectUri === "copy_access_token"
        ) {
          prompt("Copy the access token", accessToken);
          localStorage.removeItem("redirect_to");
          return;
        }

        if (
          process.env.REACT_APP_ENVIRONMENT === "development" &&
          redirectUri &&
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
          if (redirectParams.has("refreshToken")) {
            redirectParams.delete("refreshToken");
          }
          redirectParams.append("refreshToken", refreshToken);
          redirectUrl.search = redirectParams.toString();
          window.location.href = redirectUrl.toString();
        } else {
          window.location.href = `https://accounts.excelmec.org`;
        }
      })
      .catch((err) => console.log("error occurred...", err));
  };

  React.useEffect(() => {
    let width = window.innerWidth;
    if (width < 800) {
      setMobile(true);
    }
    const searchString = window.location.href.slice(
      window.location.href.indexOf("?")
    );
    const urlParams = new URLSearchParams(searchString);
    const redirectUrl = urlParams.get("redirect_to"); // check if redirectUrl is null.
    const referralCode = urlParams.get("referral");
    localStorage.setItem("redirect_to", decodeURIComponent(redirectUrl));
    if (referralCode) localStorage.setItem("referralCode", referralCode);
  }, []);

      return (
    <div className="new-login-page">
      {/* Animated background elements representing time */}
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

      {/* Main content container with glass morphism */}
      <div className="login-container">
        <div className="logo-container">
          <img 
            src={logo} 
            alt="Excel Logo" 
            className="login-logo"
          />
        </div>

        <div className="login-content">
          <h1 className="login-title">Welcome</h1>
          <p className="login-subtitle">Sign in to continue your journey</p>

          <button
            className="google-login-button"
            onClick={() => googleLogin()}
          >
              <img 
                src={googleIcon} 
                alt="Google" 
                className="google-icon"
              />
              <div className="button-text">Continue with Google</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const LoginComponent = () => {
  return (
    <GoogleOAuthProvider clientId={config.clientId}>
      <Login />
    </GoogleOAuthProvider>
  );
};

export default LoginComponent;
