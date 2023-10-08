import React, { useEffect } from 'react';
import { authorizedSites } from '../../config/authorized';
import { cookies } from '../../config/cookie';

const Authorize = () => {
	useEffect(() => {
		const payload = {
			origin: window.location.origin,
			isLoggedin: false,
			refreshToken: undefined,
		};

		function construstRefreshPayload() {
			const refreshToken = cookies.get('refreshToken');
			if (refreshToken) {
				payload.isLoggedin = true;
				payload.refreshToken = refreshToken;
			}

      console.log('payload', payload);

      console.log("all cookies", cookies.getAll());
		}

		if (window !== window.parent) {
			window.onmessage = function (e) {
				//Prevent Unauthorized access
				const url = new URL(
					window.location != window.parent.location
						? document.referrer
						: document.location.href
				);

				if (!authorizedSites.has(url.origin)) {
					console.log('Unauthorized access from ' + url);
					return;
				}
				construstRefreshPayload();
				window.parent.postMessage(JSON.stringify(payload), '*');
			};
		} else {
			construstRefreshPayload();
		}
	}, []);
	return <></>;
};

export default Authorize;
