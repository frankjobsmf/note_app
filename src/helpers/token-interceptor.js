import axios from "axios";
import { statusCode } from "../status-code/status-code";

const API_URL = "http://127.0.0.1:8000/api";
const jwt = require("jsonwebtoken");
const timeToday = new Date();


const axiosAuth = axios.create({
  baseURL: API_URL,
  mode: 'cors',
  cache: 'default',

});

const axiosAPI = axios.create({
  baseURL: API_URL, 
  headers: {
    'Authorization': JSON.parse( localStorage.getItem( 'access_token' ))
  },
  mode: 'cors',
  cache: 'default',
});

// request
axiosAPI.interceptors.request.use(
  async ( config ) => {
    
    const accessToken = JSON.parse( localStorage.getItem( 'access_token' ) );
    const refreshToken = JSON.parse( localStorage.getItem('refresh_token'));
    const decoded_token = jwt.decode( accessToken );

    if ( Date.now() >= decoded_token.exp * 1000 ) {
 
      const response = await axiosAuth.post( '/refresh-token', { refresh_token: refreshToken })
        
      if ( response ) {
        const { access_token, refresh_token } = response.data;

        localStorage.setItem( 'access_token', JSON.stringify( access_token ) );
        localStorage.setItem( 'refresh_token', JSON.stringify( refresh_token ) )

        config.headers = {
          'Authorization': JSON.parse( localStorage.getItem( 'access_token' )),
          'Content-Type': 'application/json'
        }
        
        return config;
      }
    } else {
      return config;
    }

  },
  ( error ) => {
    Promise.reject( error )
  }

);

// response interceptor


export { axiosAPI };
