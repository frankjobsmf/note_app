import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { LoginUserAPI } from '../../helpers/userService';
import { useForm } from '../../hooks/useForm';
import { types } from '../../types/types';
import jwt_decode from 'jwt-decode';

const LoginScreen = () => {

    const { dispatch } = useContext( AuthContext );

    const [ value, handleInputChange ] = useForm({
        username: '',
        password: ''
    });
    
    const { username, password } = value;

    const handleLogin = ( e ) => {
        
        e.preventDefault();

        if( username === '' && password === '' ){
            return;
        } else {

            const person = {
                username: username,
                password: password
            }

            const token = LoginUserAPI( person );

            token
                .then( resp => resp.json() )
                .then( data => {
                    console.log( data.token );
                
                    const { token } = data;

                    let decoded_token = jwt_decode( token );

                    console.log( decoded_token.user.username );

                    const user = {
                        id: decoded_token.user.id,
                        username: decoded_token.user.username,
                        token: data.token
                    }
                    

                    dispatch({
                        type: types.login,
                        payload: user
                    });
                } );
        }

    }

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <hr />

            <form>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Username"
                        name="username"
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Password"
                        name="password"
                        onChange={ handleInputChange }
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary mt-3"
                    onClick={ handleLogin }
                >Ingresar
                </button>
            </form>

        </div>
    )
}

export default LoginScreen;