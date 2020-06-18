import React from 'react';
import { GoogleLogin } from 'react-google-login';
import http from '../../config/http';
import configs from '../../config/oauth_config';

const config = configs();

const Login = () => {
    const onFailure = (error) => {
        alert(error);
    };

    const googleResponse = (response) => {
        if (!response.tokenId) {
            console.error('Unable to get tokenId from Google', response)
            return;
        }

        http.post(config.redirectUrl, { accessToken: response.accessToken }).then(user => {
            const token = user.token;
            if (typeof (token) === 'string' && !!token) {
                localStorage.setItem('jwt_token', token);
                const redirectUri = localStorage.getItem('redirect_to');
                if (redirectUri) {
                    localStorage.removeItem('redirect_to');
                    window.location.href = redirectUri;
                } else {
                    window.location.href = `${window.location.origin}/`;
                }
            } else {
                window.location.href = `${window.location.origin}/auth/login`;
                alert('Error');
                throw Error('JWT not a string or empty');
            }

        })
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