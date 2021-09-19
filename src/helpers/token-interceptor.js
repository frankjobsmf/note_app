import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";
const jwt = require("jsonwebtoken");

const axiosAuth = axios.create({
  baseURL: API_URL,
  mode: 'cors',
  cache: 'default',

});

const axiosAPI = axios.create({
  baseURL: API_URL,
  mode: 'cors',
  cache: 'default',
});

// request
axiosAPI.interceptors.request.use(
  async ( config ) => {
    
    const accessToken = JSON.parse( localStorage.getItem( 'access_token' ) );
    const refreshToken = JSON.parse( localStorage.getItem('refresh_token') );
    const decoded_token = jwt.decode( accessToken );
    const decoded_refreshToken = jwt.decode( refreshToken );

    // validacion de tiempo de expiracion para el token de acceso
    if ( Date.now() >= decoded_token.exp * 1000 ) {
 
      // se validara si el tiempo de expiracion del refresh token es mayor al tiempo actual
      // en caso de que el tiempo de expiracion del rf sea mayor al actual,
      // realizaremos el proceso para el solicitar un nuevo access token y un refresh token

      if ( Date.now() <= decoded_refreshToken.exp * 1000){
        const response = await axiosAuth.post( '/refresh-token', { refresh_token: refreshToken })


        // validamos que la peticion realizada tenga informacion
        if ( response ) {
          const { access_token, refresh_token } = response.data;
  
          localStorage.setItem( 'access_token', JSON.stringify( access_token ) );
          localStorage.setItem( 'refresh_token', JSON.stringify( refresh_token ) )
  
          config.headers = {
            // asignamos el nuevo access token que se guardo en el localStorage
            'Authorization': JSON.parse( localStorage.getItem( 'access_token' )),
            'Content-Type': 'application/json'
          }
          
          return config;
        }

      // en caso de que el tiempo de expiracion del rf sea menos al tiempo actual,
      // se cerrara la sesion del usuario y se eliminaran ambos token del localStorage
      } else {

        localStorage.removeItem( 'access_token' );
        localStorage.removeItem( 'refresh_token' );

        window.location.replace('http://localhost:3000/');

      }

    // en caso de que el tiempo de expiracion del access token sea mayor al tiempo actual,
    // se procedera con la peticion, manteniendo la configuracion original
    } else {
      config.headers = {
        'Authorization': JSON.parse( localStorage.getItem( 'access_token' )),
        'Content-Type': 'application/json'
      }

      return config;
    }

  },
  ( error ) => {
    Promise.reject( error )
  }

);

export { axiosAPI };
