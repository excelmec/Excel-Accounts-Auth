import React from 'react';
import { GoogleLogin } from 'react-google-login';
import http from '../../config/http';
import configs from '../../config/oauth_config';

const config = configs();

const setJwtInCookie = (accessToken) => {
    const d = new Date();
    d.setTime(d.getTime() + (13 * 60 * 1000)); // cookie expires in 13 minutes from now. 
    const expires = "expires=" + d.toUTCString();
    document.cookie = 'token=' + accessToken
    document.cookie = 'expires=' + expires
    // const prevCookie = document.cookie;
    // document.cookie = prevCookie + ";token=" + accessToken + ';expires=' + expires;  
}

const Login = () => {
    const onFailure = (error) => {
        alert(error);
        console.log('Google login failure...', error);
    };

    const googleResponse = (response) => {
        if (!response.tokenId) {
            console.error('Unable to get tokenId from Google', response)
            return;
        }

        http.post(config.redirectUrl, { accessToken: response.accessToken })
            .then(user => {
                console.log('user: ', user);
                const { accessToken, refreshToken } = user;
                if (!(accessToken && refreshToken) || !(typeof (accessToken) === 'string' && typeof (refreshToken) === 'string')) {
                    console.log('Error...invalid jwt');
                    alert('Invalid JWT');
                    return;
                }
                console.log('setting jwt on initial login');

                // localStorage.setItem('jwt_token', accessToken);
                setJwtInCookie(accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                const redirectUri = localStorage.getItem('redirect_to');
                if (redirectUri) {
                    localStorage.removeItem('redirect_to');
                    window.location.href = redirectUri;
                } else {
                    window.location.href = `${window.location.origin}/`;
                }
            }).catch(err => console.log('error occurred...', err));
    };

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('redirect_to');
        const referralCode = urlParams.get('referral');
        localStorage.setItem('redirect_to', redirectUrl);
        if (referralCode) localStorage.setItem('referralCode', referralCode);
    }, []);

    return (
        <div className='fullCenter'>
            <h1 className='tc auth-status-text'>Login</h1>
            <div>
                <GoogleLogin
                    clientId={config.clientId}
                    buttonText="Continue with Google"
                    onSuccess={googleResponse}
                    onFailure={onFailure}
                />
            </div>
        </div>
    );
};

export default Login;