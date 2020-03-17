import React, {useEffect} from 'react';
import { handleAuthentication } from '../../config/auth0';

const Callback = (props) => {
  useEffect(() => {
    console.log('callback page');
    handleAuthentication(props.location.hash, props.history);
  });
  return <h1>Logging in</h1>;
};

export default Callback;