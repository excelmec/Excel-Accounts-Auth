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
    const { origin } = window.location;
    // if (origin !== 'http://localhost:1000')
    //     window.location.href = `${origin}/`;
    // else
    //     window.location.href = 'http://localhost:3000/';
    // window.location.href = 'http://localhost:3000/';
    // window.location.href = 'https://accounts.excelmec.org/'
    // if (origin === 'http://localhost:3001')
    // //     window.location.href = 'http://localhost:3000/';
    // else {
        let rt = new URL(window.location.href).searchParams.get('redirect_to');
        if (!rt) {
            window.location.href = 'https://accounts.excelmec.org/'
        }
        else {
            const refreshToken = window.localStorage.getItem('refreshToken')
            if (rt.indexOf("http://") == 0 || rt.indexOf("https://") == 0) {
                window.location.href = `${rt}?refreshToken=${refreshToken}`
            }
            else{
                window.location.href = `https://${rt}?refreshToken=${refreshToken}`

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