import { ApiRoot } from './api';

// const getJwtTokenFromCookie = () => {
//   const decodedCookie = decodeURIComponent(document.cookie);
//   // const
// }
export const getJwtFromCookie = () => {
  const cookies = document.cookie.split('; ')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    if (name === 'token') {
      const token = cookie.substr(eqPos + 1)
      return token
    }
  }
  return ''
}

const post = async (url, data) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  const jwtToken = getJwtFromCookie();
  if (getJwtFromCookie()) {
    headers.Authorization = 'Bearer ' + jwtToken
  }
  return fetch(ApiRoot + url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => err);
};

const get = async (url) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  const jwtToken = getJwtFromCookie();
  if (jwtToken) {
    headers.Authorization = 'Bearer ' + jwtToken;
  }
  return fetch(ApiRoot + url, {
    method: 'GET',
    headers: headers
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export default { post, get };