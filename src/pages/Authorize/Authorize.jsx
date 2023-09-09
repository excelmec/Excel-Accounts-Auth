import React, { useEffect } from "react";
import { authorizedSites } from "../../config/authorized";

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
      const refreshToken = localStorage.getItem("refreshToken");
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
