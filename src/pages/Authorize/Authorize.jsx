import React, { useEffect } from 'react';

const authorizedSites = [
  'http://localhost',
  'http://localhost:3000',
  'http://localhost:5000',
  'https://staging.alfred.excelmec.org',
  'https://alfred.excelmec.org',
  'https://excelmec.org',
  'https://staging.play.excelmec.org',
  'https://play.excelmec.org',
  'https://excel2020.netlify.app'
]

const Authorize = () => {
  useEffect(() => {
    // window.parent.postMessage(localStorage.getItem('refreshToken'), '*');
    // window.parent.postMessage(localStorage.getItem('refreshToken'), authorizedSites.join(', '))
    authorizedSites.forEach(authorizedSite => {
      window.parent.postMessage(localStorage.getItem('refreshToken'), authorizedSite)
    })
  }, []);
  return <h1 className='white'>Hi</h1>;
};

export default Authorize;
