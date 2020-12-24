import React, { useEffect } from 'react';

// const authorizedSites = new Set([
//   'http://localhost',
//   'http://localhost:3000',
//   'http://localhost:5000',
//   'http://127.0.0.1:8080',
//   'https://staging.alfred.excelmec.org',
//   'https://alfred.excelmec.org',
//   'https://excelmec.org',
//   'https://staging.play.excelmec.org',
//   'https://play.excelmec.org',
//   'https://excel2020.netlify.app'
// ])

const Authorize = () => {
  useEffect(() => {
    // console.log('Parent hostname', window.parent.location.hostname)
    window.parent.postMessage(localStorage.getItem('refreshToken'), '*');
    // const url = (window.location != window.parent.location)
    //   ? document.referrer
    //   : document.location.hostname;
    // authorizedSites.forEach(authorizedSite => {
    //   window.parent.postMessage(localStorage.getItem('refreshToken'), authorizedSite)
    // })
    // if (url in authorizedSites) {
    //   window.parent.postMessage(localStorage.getItem('refreshToken'), url);
    // }

  }, []);
  return <h1 className='white'>Hi</h1>;
};

export default Authorize;
