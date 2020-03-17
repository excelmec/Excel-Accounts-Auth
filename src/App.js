import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Loader from './components/Loader/Loader';

const Login = lazy(() => import('./pages/Login/Login'));
const Logout = lazy(() => import('./pages/Logout/Logout'));
const Authorize = lazy(() => import('./pages/Authorize/Authorize'));
const NotFound = lazy(() => import('./pages/NotFound'));
// import Base from './pages/Base';

const App = () => {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <PublicRoute path='/auth/login' component={Login} />
                    <PrivateRoute path='/auth/logout' component={Logout} />
                    <PrivateRoute path='/auth/authorize' component={Authorize} />
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;