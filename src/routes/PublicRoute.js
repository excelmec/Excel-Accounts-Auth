import React from 'react';
import { isLoggedIn } from '../config/oauth_config';
import { Route } from 'react-router-dom';

const PublicRoute = ({
    component: Component,
    ...rest
}) => {
    if (!isLoggedIn()) return (
        <Route {...rest} component={(props) => (
            <Component {...props} />
        )} />
    );
        let rt = new URL(window.location.href).searchParams.get('redirect_to');
        if (!rt) {
            window.location.href = 'https://accounts.excelmec.org/'
        }
        else {
            const redirectUrl = new URL(decodeURIComponent(rt));
            const urlParams = new URLSearchParams(redirectUrl.search);
            const refreshToken = window.localStorage.getItem('refreshToken')

            if(urlParams.has("refreshToken")){
                urlParams.delete("refreshToken");
            }
            urlParams.append("refreshToken", refreshToken);
            redirectUrl.search = urlParams.toString();

            if (rt.indexOf("http://") == 0 || rt.indexOf("https://") == 0) {
                window.location.href = `${redirectUrl.pathname}?${redirectUrl.search}`
            }
            else{
                window.location.href = `https://${redirectUrl.pathname}?${redirectUrl.search}`
            }
           
         }
    // }
    return (
        <div style={{ width:'100%', height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor: '#082743'}}>
            <h2 className='fullCenter' style={{ color: 'white' }}>Already logged in</h2>
        </div>
    )
}


export default PublicRoute;