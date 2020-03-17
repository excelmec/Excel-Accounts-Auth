import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Logout from './Logout/Logout';
import Authorize from './Authorize/Authorize';
import PrivateRoute from '../PrivateRoute';

const Base = () => (
  <div className='App'>
    <PrivateRoute>
      <Switch>
        <Route path='/auth/logout' component={Logout} />
        <Route path='/auth/authorize' component={Authorize} />
      </Switch>
    </PrivateRoute>
  </div>
);

export default Base;