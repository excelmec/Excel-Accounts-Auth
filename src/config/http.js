import { ApiRoot } from './api';

const post = async (url, data) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  if (localStorage.getItem('jwt_token')) {
    headers.Authorization = 'Bearer ' + localStorage.getItem('jwt_token');
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
  if (localStorage.getItem('jwt_token')) {
    headers.Authorization = 'Bearer ' + localStorage.getItem('jwt_token');
  }
  return fetch(ApiRoot + url, {
    method: 'GET',
    headers: headers
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

export default { post, get };