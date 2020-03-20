import React from 'react';
import { isLoggedIn } from '../config/auth0';
import { Route } from 'react-router-dom';

const PublicRoute = ({
    component: Component,
    ...rest
}) => {
    if (!isLoggedIn()) return (
        <Route {...rest} component={(props) => (
            <Component {...props} />
        )} />
    );
    try {
        window.history.back();
    } catch (e) {
        window.location.href = `${window.location.origin}/`;
    };
    return <p className='fullCenter'>Already logged in</p>;
}


export default PublicRoute;