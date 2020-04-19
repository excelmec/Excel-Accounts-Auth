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

const setSession = async (authResult, history) => {
    console.log(authResult.accessToken);
    return http
        .post('/auth/login', { auth_token: authResult.accessToken })
        .then(res => {
            const { token } = res;
            if (typeof(token)==='string' && !!token) {
                localStorage.setItem('jwt_token', token);
                const redirectUri = localStorage.getItem('redirect_to');
                if (redirectUri) {
                    localStorage.removeItem('redirect_to');
                    window.location.href = redirectUri;
                } else {
                    window.location.href = `${window.location.origin}/`;
                }
            } else {
                window.location.href=`${window.location.origin}/auth/login`;
                alert('Error');
                throw Error('JWT not a string or empty');
            }
        }).catch((err) => {
            console.log('Error...', err);
        });
};

export const handleLogout = (history, redirectUrl) => {
    webAuth.logout({
        returnTo: redirectUrl
    });
    // webAuth.logout();
};

export const isLoggedIn = () => {
    if (localStorage.getItem('jwt_token')) {
        return true;
    }
    return false;
};