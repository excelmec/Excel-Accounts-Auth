import React, {useEffect} from 'react';
import { handleLogout } from '../../config/auth0';
import CubeSpinner from '../../components/Spinner/CubeSpinner';

const Logout = (props) => {
  useEffect(() => {
    localStorage.clear();
    var cookies = document.cookie.split(';');
  
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf('=');
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    
    handleLogout(props.location.hash);
  });
  
  return (
    <div className='fullCenter'>
      <CubeSpinner />
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;