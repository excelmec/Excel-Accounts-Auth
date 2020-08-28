import React, { useEffect } from 'react';

const Authorize = () => {
  useEffect(() => {
    window.parent.postMessage(localStorage.getItem('refreshToken'), '*');
  }, []);
  return <h1>Hi</h1>;
};

export default Authorize;
