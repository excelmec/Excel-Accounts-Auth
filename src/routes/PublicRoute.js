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
    window.location.href = `${window.location.origin}/`;
    return <h2 className='fullCenter' style={{ color: 'white' }}>Already logged in</h2>;
}


export default PublicRoute;