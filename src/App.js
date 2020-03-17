import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Authorize from './pages/Authorize/Authorize';
import NotFound from './pages/NotFound';
import PrivateRoute from './PrivateRoute';
// import Base from './pages/Base';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/auth/login' component={Login} />
                <PrivateRoute path='/auth/logout' component={Logout} />
                <PrivateRoute path='/auth/authorize' component={Authorize} />
                <Route component={NotFound} />
                {/* <Route path='/auth' component={Base} /> */}
            </Switch>
        </Router>
    );
}

export default App;