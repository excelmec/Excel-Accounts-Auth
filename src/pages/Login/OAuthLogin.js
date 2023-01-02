import React from 'react';
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import http from '../../config/http';
import configs from '../../config/oauth_config';

const config = configs();

window.addEventListener('error', (event) => {
    console.log('Error: ', event);
    alert('Error event msg: ', event.message);
})

const setJwtInCookie = (accessToken) => {
    const d = new Date();
    d.setTime(d.getTime() + (13 * 60 * 1000)); // cookie expires in 13 minutes from now. 
    const expires = "expires=" + d.toUTCString();
    // document.cookie = 'token=' + accessToken
    // document.cookie = expires
    // const prevCookie = document.cookie;
    // document.cookie = prevCookie + ";token=" + accessToken + ';expires=' + expires;  
    document.cookie = "token=" + accessToken + ";" + expires + ";path=/";
}



const Login = () => {
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
        onSuccess: tokenResponse => googleResponse({credential:tokenResponse.access_token}),
    });
    const googleResponse = (response) => {
        console.log(response)
        if (!response.credential) {
            console.error('Unable to get tokenId from Google', response)
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
                // console.log('setting jwt on initial login');

                // localStorage.setItem('jwt_token', accessToken);
                console.log("Successfull",accessToken)
                setJwtInCookie(accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                const redirectUri = localStorage.getItem('redirect_to');
                console.log(redirectUri);
                debugger;
                if (redirectUri) {
                    localStorage.removeItem('redirect_to');
                    window.location.href = `${redirectUri}?refreshToken=${refreshToken}`;
                } else {
                    window.location.href = `https://accounts.excelmec.org`;
                }
            }).catch(err => console.log('error occurred...', err));
    };

    React.useEffect(() => {
        const searchString = window.location.href.slice(window.location.href.indexOf('?'))
        const urlParams = new URLSearchParams(searchString);
        const redirectUrl = urlParams.get('redirect_to'); // check if redirectUrl is null. 
        const referralCode = urlParams.get('referral');
        localStorage.setItem('redirect_to', redirectUrl);
        if (referralCode) localStorage.setItem('referralCode', referralCode);
    }, []);

    return (
        <div className='fullCenter'>
            <h1 className='tc auth-status-text'>Login</h1>
            <div>

                {/* <GoogleLogin
                    onSuccess={googleResponse}
                    onError={onFailure}
                /> */}
                    <button onClick={() => googleLogin()}>Google login</button>
            </div>
        </div>
    );
};

const LoginComponent = () => {
    return(
        <GoogleOAuthProvider clientId={'136459835955-hqmdecr92va0dnomttvnsfnmm0kmjsbq.apps.googleusercontent.com'}>
            <Login />
        </GoogleOAuthProvider>
    )
}

export default LoginComponent;
