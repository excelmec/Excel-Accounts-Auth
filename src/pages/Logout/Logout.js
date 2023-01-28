import React, { useEffect } from 'react';
import { useGoogleLogout } from 'react-google-login';
import CubeSpinner from '../../components/Spinner/CubeSpinner';
import configs from '../../config/oauth_config';

const config = configs();

const Logout = () => {
  

  useEffect(() => {
    localStorage.clear();
    const cookies = document.cookie.split(';');
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect_to');
    console.log('Successfully logged out!');
    window.location.href = redirectUrl;
  });

  return (
    <div className='fullCenter'>
      <CubeSpinner />
      <h1 className='auth-status-text'>Logging out...</h1>
    </div>
  );
}

export default Logout;