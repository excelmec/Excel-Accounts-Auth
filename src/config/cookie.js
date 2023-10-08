import Cookies from "universal-cookie";

const cookies = new Cookies(null, {
    httpOnly: false,
    secure: false,
    sameSite: 'none',
    path: '/'
});

export {
    cookies
}