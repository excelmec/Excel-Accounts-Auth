import React, {useEffect} from 'react';
import { handleAuthentication } from '../../config/auth0';
import CubeSpinner from '../../components/Spinner/CubeSpinner';

const Callback = (props) => {
  useEffect(() => {
    handleAuthentication(props.location.hash, props.history);
  });
  return (
    <div className='fullCenter'>
      <CubeSpinner />
      <h1>Logging in</h1>
    </div>
  );
};

export default Callback;