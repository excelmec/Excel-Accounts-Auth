import React from 'react';
import { isLoggedIn } from '../config/oauth_config';
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
    // const { origin } = window.location;
    // if (origin !== 'http://localhost:1000')
    //     window.location.href = `${origin}/`;
    // else
    //     window.location.href = 'http://localhost:3000/';
    // window.location.href = 'http://localhost:3000/';
    window.location.href = 'https://accounts.excelmec.org/'
    return <h2 className='fullCenter' style={{ color: 'white' }}>Already logged in</h2>;
}


export default PublicRoute;