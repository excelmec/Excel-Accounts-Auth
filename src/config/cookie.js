import Cookies from "universal-cookie";

const cookies = new Cookies(null, {
    httpOnly: false,
    secure: true,
    sameSite: 'none',
    path: '/'
});

export {
    cookies
}