import React from 'react';
import { Route } from 'react-router-dom';
import './Login.css';

import { login } from '../../config/auth0';
import Callback from './Callback';

const LoginButton = () => (
  <button onClick={login} className='btn'>Login</button>
);

const Login = (props) => {
  const { match } = props;
  console.log('match: ', match);
  return (
    <div className='loginPage'>
      <Route exact path={`${match.url}`} component={LoginButton} />
      <Route path={`${match.url}/callback/`} component={Callback} />
    </div>
  );
};
export default Login;
