import * as auth0 from 'auth0-js';

import configs from './auth_config';
import http from './http';

const config = configs();

const webAuth = new auth0.WebAuth({
    clientID: config.clientID,
    domain: config.domain,
    responseType: 'token id_token',
    redirectUri: `${window.location.origin}/auth/login/callback`,
    scope: 'openid profile email'
});

export const login = () => {
    webAuth.authorize();
};

export const handleAuthentication = (hash, history) => {
    return webAuth.parseHash({ hash }, async function (
        err,
        authResult
    ) {
        if (err) {
            console.log(err);
        }

        setSession(authResult, history);
    });
};

const setSession = (authResult, history) => {
    console.log(authResult.accessToken);
    return http
        .post('/auth/login', { auth_token: authResult.accessToken })
        .then(res => {
            localStorage.setItem('jwt_token', res.token);
            const redirectUri = localStorage.getItem('redirect_to');
            if (redirectUri) {
                localStorage.removeItem('redirect_to');
                window.location.href = redirectUri;
            } else {
                window.location.href = `${window.location.origin}/`;
            }
        });
};

export const handleLogout = (history) => {
    webAuth.logout({
        returnTo: window.location.origin
    });
    // webAuth.logout();
};

export const isLoggedIn = () => {
    if (localStorage.getItem('jwt_token')) {
        return true;
    }
    return false;
};