const header = new Headers({
    'Content-Type': 'application/json'
});

//ENDPOINT BACKEND DJANGO API GATEWAY
const USER_API_GATEWAY = 'http://127.0.0.1:8000/api';

export const loginAPI = () => {
    console.log('loginAPI funcionando');
}

export const LoginUserAPI = ( user = {} ) => {
    
    const init = {
        method: 'POST',
        headers: header,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify( user )
    };
    
    try {
      
        return fetch( `${USER_API_GATEWAY}/login`, init );
            // .then( ( response ) => {
            //     response.json().then( ( data ) => {
            //         return data;
            //     } ).catch( ( error ) => {
            //         console.error( `Este es el mensaje de error: ${error}` );
            //     } )
            // } )

    } catch (error) {
        console.error( error );
    }
}