import React, { useEffect } from 'react';
// import { handleLogout } from '../../config/auth0';
import CubeSpinner from '../../components/Spinner/CubeSpinner';

const Logout = (props) => {
  const handleLogout = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut();
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect_to');
    localStorage.clear();
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf('=');
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    handleLogout();
  });

  return (
    <div className='fullCenter'>
      <CubeSpinner />
      <h1 className='auth-status-text'>Logging out...</h1>
    </div>
  );
}

export default Logout;