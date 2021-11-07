// import { getJwtFromCookie } from "./http";

const config = () => {
    if (process.env.NODE_ENV === 'development') {
        return {
            //clientId: '357322315568-stm2tq6ohqcdpivksv9dl9oa3mjh6b7m.apps.googleusercontent.com',
            clientId: '400055254952-f3tit3vs62vubio68pa1gctp6u1nf9ab.apps.googleusercontent.com',
            // domain: 'ajeshkumar.eu.auth0.com',
            domain: 'dev-rkk793px.auth0.com',
            redirectUrl: '/auth/login'
        };
    } else {
        return {
            //clientId: '357322315568-stm2tq6ohqcdpivksv9dl9oa3mjh6b7m.apps.googleusercontent.com',
            clientId: '400055254952-f3tit3vs62vubio68pa1gctp6u1nf9ab.apps.googleusercontent.com',
            // domain: 'ajeshkumar.eu.auth0.com',
            domain: 'dev-rkk793px.auth0.com',
            redirectUrl: '/auth/login'
        };
    }
};

export const isLoggedIn = () => {
    // const token = getJwtFromCookie()
    const token = localStorage.getItem('refreshToken')
    return !!token;
};

export default config;  