const config = () => {
  if (process.env.NODE_ENV === 'development') {
      return {
      clientID: 'Xcmx1whIj6t4qEUvzYkoXz1Icq3hHD3B',
      domain: 'ajeshkumar.eu.auth0.com'
      };
  } else {
      return {
      clientID: 'Xcmx1whIj6t4qEUvzYkoXz1Icq3hHD3B',
      domain: 'ajeshkumar.eu.auth0.com'
      };
  }
};

export default config;  