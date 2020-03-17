import React, {useEffect} from 'react';
import { handleLogout } from '../../config/auth0';

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
  
  return <h1 style={{ textAlign: 'center' }}>Logging out...</h1>;
}

export default Logout;