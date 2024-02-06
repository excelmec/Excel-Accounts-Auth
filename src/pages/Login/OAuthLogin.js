import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import http from '../../config/http';
import configs from '../../config/oauth_config';
import logo from '../../assets/logotext.png'
import googleIcon from '../../assets/google_icon.png'
import './Login.css'
import { cookies } from '../../config/cookie';

const config = configs();



window.addEventListener('error', (event) => {
    console.log('Error: ', event);
    alert('Error event msg: ', event.message);
})

const setRefreshTokenCookie = (refreshToken) => {
    console.log('Setting refresh token cookie...');
    const oneYear = (60 * 60 * 24 * 365) - 1000;
    cookies.set('refreshToken', refreshToken, {
        maxAge: oneYear,
    })
}



const Login = () => {
    const [mobile, setMobile] = useState(false)
    const onFailure = (error) => {
        // alert(JSON.stringify(error));
        try {
            alert(`Error: ${error.error.split('_').join(' ')}`);
        } catch (e) {
            alert('Please enable cookies if you are in private mode. ')
        }
        console.log('Google login failure...', error);
    };
    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => googleResponse({ credential: tokenResponse.access_token }),
    });
    const googleResponse = (response) => {
        console.log(response)
        if (!response.credential) {
            console.error('Unable to get tokenId from Google', response)
            return;
        }

        /**
         * This is the redirectUri to which the user 
         * will be redirected after successful login.
         * eg: excel main page, account page, etc.
         */
        const redirectUri = decodeURIComponent(localStorage.getItem('redirect_to') || 'https://excelmec.org');
        console.log(redirectUri);

        /**
         * This is to test the signup flow in development,
         * without triggering it from Frontend.
         */
        if (
            process.env.REACT_APP_ENVIRONMENT === 'development' &&
            redirectUri &&
            redirectUri === "copy_g_access_token"
        ) {
            prompt('Copy the google access token', response.credential);
            localStorage.removeItem('redirect_to');
            return;
        }

        http.post(config.redirectUrl, { accessToken: response.credential })
            .then(user => {
                // console.log('user: ', user);
                const { accessToken, refreshToken } = user;
                if (!(accessToken && refreshToken) || !(typeof (accessToken) === 'string' && typeof (refreshToken) === 'string')) {
                    console.log('Error...invalid jwt');
                    alert('Invalid JWT');
                    return;
                }

                console.log("Successfull", accessToken)

                setRefreshTokenCookie(refreshToken);
                localStorage.setItem('refreshToken', refreshToken);

                if (
                    process.env.REACT_APP_ENVIRONMENT === 'development' &&
                    redirectUri &&
                    redirectUri === "copy_access_token"
                ) {
                    prompt('Copy the access token', accessToken);
                    localStorage.removeItem('redirect_to');
                    return;
                }

                if (
                    process.env.REACT_APP_ENVIRONMENT === 'development' &&
                    redirectUri &&
                    redirectUri === "copy_refresh_token"
                ) {
                    prompt('Copy the refresh token', refreshToken);
                    localStorage.removeItem('redirect_to');
                    return;
                }

                debugger;
                if (redirectUri) {
                    localStorage.removeItem('redirect_to');

                    const redirectUrl = new URL(redirectUri);
                    const redirectParams = new URLSearchParams(redirectUrl.search);
                    if (redirectParams.has("refreshToken")) {
                        redirectParams.delete("refreshToken");
                    }
                    redirectParams.append("refreshToken", refreshToken);
                    redirectUrl.search = redirectParams.toString();
                    window.location.href = redirectUrl.toString();
                } else {
                    window.location.href = `https://accounts.excelmec.org`;
                }
            }).catch(err => console.log('error occurred...', err));
    };

    React.useEffect(() => {
        let width = window.innerWidth;
        if (width < 800) {
            setMobile(true);
        }
        const searchString = window.location.href.slice(window.location.href.indexOf('?'))
        const urlParams = new URLSearchParams(searchString);
        const redirectUrl = urlParams.get('redirect_to'); // check if redirectUrl is null. 
        const referralCode = urlParams.get('referral');
        localStorage.setItem('redirect_to', decodeURIComponent(redirectUrl));
        if (referralCode) localStorage.setItem('referralCode', referralCode);
    }, []);

    return (
        <div className='loginPage' style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src={logo} width={mobile ? "60%" : "30%"} />
            <div style={{ height: '20vh' }}></div>
            <div className="google-btn" style={{ cursor: 'pointer' }} onClick={() => googleLogin()}>
                <div className="google-icon-wrapper">
                    <img className="google-icon" src={googleIcon} />
                </div>
                <p className="btn-text"><b>Sign in with google</b></p>
            </div>
        </div>
    );
};

const LoginComponent = () => {
    return (
        <GoogleOAuthProvider clientId={config.clientId}>
            <Login />
        </GoogleOAuthProvider>
    )
}

export default LoginComponent;
