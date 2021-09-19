import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { loginAction } from '../../actions/auth';

const LoginScreen = ({ history }) => {

    const dispatch = useDispatch();

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

            dispatch( loginAction( username, password ) );
            
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
            <h2 className="title-noteapp text-center">NoteApp</h2>
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