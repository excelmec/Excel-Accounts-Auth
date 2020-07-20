import React, { useEffect } from 'react';
import { useGoogleLogout } from 'react-google-login';
import CubeSpinner from '../../components/Spinner/CubeSpinner';
import configs from '../../config/oauth_config';

const config = configs();

const Logout = () => {
  const onFailure = (e) => {
    console.log('Error logging out: ', e);
  }
  const onLogoutSuccess = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect_to');
    console.log('Successfully logged out!');
    window.location.href = redirectUrl;
  }

  const { signOut/*, loaded */ } = useGoogleLogout({
    onFailure,
    onLogoutSuccess,
    clientId: config.clientId,
  });

  useEffect(() => {
    localStorage.clear();
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf('=');
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    signOut();
  });

  return (
    <div className='fullCenter'>
      <CubeSpinner />
      <h1 className='auth-status-text'>Logging out...</h1>
    </div>
  );
}

export default Logout;