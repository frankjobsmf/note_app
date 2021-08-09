import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useForm } from '../../hooks/useForm';
import { types } from '../../types/types';
import axios from 'axios';
import { urlUser } from '../../urls/endpointsUser';


const LoginScreen = ({ history }) => {

    const jwt = require('jsonwebtoken');
    
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

            axios.post(urlUser.signin, person)
                .then( resp => {
                    
                    console.log(resp)

                    const { access_token, refresh_token } = resp.data;

                    localStorage.setItem('access', JSON.stringify(access_token));
                    localStorage.setItem('refresh', JSON.stringify(refresh_token));

                    const decoded_token = jwt.decode( access_token );

                    const user = {
                        id: decoded_token.user.id,
                        username: decoded_token.user.username
                    }

                    dispatch({
                        type: types.login,
                        payload: user
                    })

                });
        }

    }

    const handleRegister = (e) => {
        e.preventDefault();

        setTimeout(() => {
            history.push('/register')
        })
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">NoteApp - Iniciar sesión</h2>
            <hr />


            <div className="row m-5 d-flex justify-content-center align-items-center">
                <div className="col-sm-8" style={{width: "500px", height: "400px"}}> 
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Username"
                                name="username"
                                onChange={ handleInputChange }
                                autoComplete="off"
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
                        <div className="d-flex justify-content-around">
                            <button 
                                type="submit" 
                                className="btn btn-primary mt-3"
                                onClick={ handleLogin }
                                style={{ width: "200px" }}
                            >Ingresar
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary mt-3"
                                onClick={ handleRegister }
                                style={{ width: "200px" }}
                            >Registrarse
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default LoginScreen;