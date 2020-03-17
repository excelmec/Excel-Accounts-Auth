import React from 'react';
import { isLoggedIn } from './config/auth0';
import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({children}) => {
//   console.log('auth - isLoggedIn: ', isLoggedIn());
//   if (isLoggedIn()) {
//     return children;
//   }
//   return <Redirect to='/login' />;
// }
const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest} component={(props) => (
            isLoggedIn() ? (
                <Component {...props} />
            ) : (
                <Redirect to='/auth/login' />
            )
        )} />
    );
}


export default PrivateRoute;