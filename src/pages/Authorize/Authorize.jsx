import React, { useEffect } from "react";
import { authorizedSites } from "../../config/authorized";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Authorize = () => {
  useEffect(() => {
    window.onmessage = function (e) {
      var parent = window.parent;
      var url =
        window.location !== window.parent.location
          ? document.referrer
          : document.location.href;

      //Prevent Unauthorized access
      if (!authorizedSites.has(url)) {
        console.log("Unauthorized access from " + url);
        return;
      }

      var data = {
        origin: e.origin,
      };
      data.isLoggedin = false;

      // local storage was not being shared betweeen the iframe
      //  and auth-dev page, so using cookies instead
      // const refreshToken = localStorage.getItem("refreshToken");

      const refreshToken = cookies.get("refreshToken");
      if (refreshToken) {
        data.refreshToken = refreshToken;
        data.isLoggedin = true;
      }

      parent.postMessage(JSON.stringify(data), "*");
    };
  }, []);
  return <></>;
};

export default Authorize;
