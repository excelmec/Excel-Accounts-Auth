//const hostname = window.location.hostname === 'localhost' ? "staging.accounts.excelmec.org" : window.location.hostname;
// const hostname = "excel-accounts-backend-ovhv32pszq-el.a.run.app";
const hostname = "accountsbackend-xgveswperq-uc.a.run.app";
//const hostname = window.location.hostname === 'localhost' ? "localhost:5000" : window.location.hostname;

export const WSRoot = `ws://${hostname}`;
export const ApiRoot = `https://${hostname}`;