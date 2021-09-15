import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/';

const jwt = require('jsonwebtoken');

const registerService = (username, email, password) => {
    return axios.post(
        API_URL + 'register',
        {
            username,
            email,
            password
        }
    );
};

const loginService = ( username, password ) => {

    return axios.post( 
        API_URL + 'login',
        { username, password }
    )
    .then( ( response ) => {
        if ( response.data.access_token ){

            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;

            const decoded_token = jwt.decode( response.data.access_token );

            const user = {
                id: decoded_token.user.id,
                username: decoded_token.user.username,
            }

            localStorage.setItem( 'access_token', JSON.stringify( access_token ) );
            localStorage.setItem( 'refresh_token', JSON.stringify( refresh_token ));

            return user;
        }
    });
};

const logoutService = () => {
    localStorage.removeItem("access_token");
};

export {
    registerService,
    loginService,
    logoutService,
};