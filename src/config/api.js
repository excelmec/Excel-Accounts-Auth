const hostname = window.location.hostname === 'localhost' ? "staging.accounts.excelmec.org" : window.location.hostname;

export const WSRoot = `ws://${hostname}`;
export const ApiRoot = `https://${hostname}/api`;
