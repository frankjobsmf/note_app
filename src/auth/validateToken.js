import axios from 'axios';
import { types } from '../types/types';
import { urlUser } from '../urls/endpointsUser';


const jwt = require('jsonwebtoken');

//extrayendo data del local storage
const access_token = JSON.parse( localStorage.getItem( 'access' ) );
const refresh_token = JSON.parse( localStorage.getItem( 'refresh' ) );


export const validateToken = ( dispatchUser, history ) => {

    if ( access_token !== null && refresh_token !== null ) {

        console.log( access_token );

        const decoded_access_token = jwt.decode( access_token, {complete: true} );
        const decoded_refresh_token = jwt.decode( refresh_token, {complete: true} );
        
        const dateNow = new Date();

        if ( decoded_refresh_token.payload.exp * 1000 < dateNow.getTime() ){

            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
    
            dispatchUser({
                type: types.logout
            });
    
            history.replace('/login');
        
        } else if ( decoded_access_token.payload.exp * 1000 > dateNow.getTime()){
    
            axios.post( urlUser.refresh, {refresh_token}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                cache: 'default',
            })
            .then( resp => {
    
                const { access_token, refresh_token } = resp.data;
    
                localStorage.setItem('access', JSON.stringify(access_token));
                localStorage.setItem('refresh', JSON.stringify(refresh_token));
            })
        }
    }
};