import React from 'react';
import { isLoggedIn } from '../config/auth0';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
    component: Component,
    ...rest
}) => {
    if (!isLoggedIn() ) return (
        <Route {...rest} component={(props) => (
            <Component {...props} />
        )} />
    );
    window.location.href = `${window.location.origin}/`;
}


export default PublicRoute;