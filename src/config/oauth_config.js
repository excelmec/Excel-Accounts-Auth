// import { getJwtFromCookie } from "./http";

const config = () => {
    if (process.env.NODE_ENV === 'development') {
        return {
            clientId: '357322315568-stm2tq6ohqcdpivksv9dl9oa3mjh6b7m.apps.googleusercontent.com',
            domain: 'ajeshkumar.eu.auth0.com',
            redirectUrl: '/auth/login'
        };
    } else {
        return {
            clientId: '357322315568-stm2tq6ohqcdpivksv9dl9oa3mjh6b7m.apps.googleusercontent.com',
            domain: 'ajeshkumar.eu.auth0.com',
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