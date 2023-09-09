// import { getJwtFromCookie } from "./http";

const config = () => {

    if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
        throw new Error("REACT_APP_GOOGLE_CLIENT_ID not set");
    }

    return {
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        redirectUrl: '/api/auth/login'
    }

    // if (process.env.NODE_ENV === 'development') {
    //     return {
    //         clientId: '136459835955-hqmdecr92va0dnomttvnsfnmm0kmjsbq.apps.googleusercontent.com',
    //         // clientId: '400055254952-f3tit3vs62vubio68pa1gctp6u1nf9ab.apps.googleusercontent.com',
    //         // domain: 'ajeshkumar.eu.auth0.com',
    //         domain: 'dev-rkk793px.auth0.com',
    //         redirectUrl: '/auth/login'
    //     };
    // } else {
    //     return {
    //         clientId: '136459835955-hqmdecr92va0dnomttvnsfnmm0kmjsbq.apps.googleusercontent.com',
    //         // clientId: '400055254952-f3tit3vs62vubio68pa1gctp6u1nf9ab.apps.googleusercontent.com',
    //         // domain: 'ajeshkumar.eu.auth0.com',
    //         domain: 'dev-rkk793px.auth0.com',
    //         redirectUrl: '/auth/login'
    //     };
    // }
};

export const isLoggedIn = () => {
    // const token = getJwtFromCookie()
    const token = localStorage.getItem('refreshToken')
    return !!token;
};

export default config;  