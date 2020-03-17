import React, {useEffect} from 'react';
import { handleAuthentication } from '../../config/auth0';

const Callback = (props) => {
  useEffect(() => {
    handleAuthentication(props.location.hash, props.history);
  });
  return <h1 className='fullCenter'>Logging in</h1>;
};

export default Callback;