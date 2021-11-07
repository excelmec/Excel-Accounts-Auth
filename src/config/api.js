//const hostname = window.location.hostname === 'localhost' ? "staging.accounts.excelmec.org" : window.location.hostname;
//const hostname = window.location.hostname === 'localhost' ? "excel-accounts-backend-ovhv32pszq-el.a.run.app" : window.location.hostname;
const hostname = window.location.hostname === 'localhost' ? "localhost:5000" : window.location.hostname;

export const WSRoot = `ws://${hostname}`;
// export const ApiRoot = `https://${hostname}/api`;
export const ApiRoot = `https://${hostname}`;