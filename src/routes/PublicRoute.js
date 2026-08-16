import React from 'react';
import { isLoggedIn } from '../config/oauth_config';
import { Route } from 'react-router-dom';
import AlreadyLoggedIn from '../pages/AlreadyLoggedIn';
import { cookies } from '../config/cookie';

const PublicRoute = ({
    component: Component,
    ...rest
}) => {
    // `prompt=login` means the user explicitly asked to sign in or switch accounts.
    // Replaying the stored session there would silently log them in as whoever used
    // this browser last, so drop it and force a real Google login.
    if (new URL(window.location.href).searchParams.get('prompt') === 'login') {
        window.localStorage.removeItem('refreshToken');
        cookies.remove('refreshToken');
    }

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
        // Never hand back a literal "null" — the consuming app would store it as a session.
        if (refreshToken) {
            urlParams.append("refreshToken", refreshToken);
        }
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
