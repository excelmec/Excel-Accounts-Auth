//const hostname = window.location.hostname === 'localhost' ? "staging.accounts.excelmec.org" : window.location.hostname;
// const hostname = "excel-accounts-backend-ovhv32pszq-el.a.run.app";

if(!process.env.REACT_APP_ACC_BACKEND_HOSTNAME) {
    throw new Error("REACT_APP_ACC_BACKEND_HOSTNAME not set");
}

const hostname = process.env.REACT_APP_ACC_BACKEND_HOSTNAME;
//const hostname = window.location.hostname === 'localhost' ? "localhost:5000" : window.location.hostname;

export const WSRoot = `ws://${hostname}`;
export const ApiRoot = `https://${hostname}`;