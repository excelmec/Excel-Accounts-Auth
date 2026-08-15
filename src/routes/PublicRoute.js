import React from 'react';
import { isLoggedIn } from '../config/oauth_config';
import { Route } from 'react-router-dom';
import AlreadyLoggedIn from '../pages/AlreadyLoggedIn';

const PublicRoute = ({
    component: Component,
    ...rest
}) => {
    if (!isLoggedIn()) return (
        <Route {...rest} component={(props) => (
            <Component {...props} />
        )} />
    );
    let rt = new URL(window.location.href).searchParams.get('redirect_to');
    if (!rt) {
        window.location.href = 'https://excelmec.org'
    }
    else {
        const redirectUrl = new URL(decodeURIComponent(rt));
        const urlParams = new URLSearchParams(redirectUrl.search);
        const refreshToken = window.localStorage.getItem('refreshToken')

        if (urlParams.has("refreshToken")) {
            urlParams.delete("refreshToken");
        }
        urlParams.append("refreshToken", refreshToken);
        redirectUrl.search = urlParams.toString();

        if (
            redirectUrl.toString().indexOf("http://") == 0 ||
            redirectUrl.toString().indexOf("https://") == 0
        ) {
            window.location.href = redirectUrl.toString();
        }
        else {
            window.location.href = `https://${redirectUrl.toString()}`
        }

    }
    // }
    return (
        <AlreadyLoggedIn />
    )
}


export default PublicRoute;
