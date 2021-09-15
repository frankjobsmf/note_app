import React from 'react';
// import { RegisterUserAPI } from '../../helpers/userService';
import { useForm } from '../../hooks/useForm';

const RegisterScreen = ({ history }) => {

    const [ value, handleInputChange ] = useForm({
        username: '',
        email: '',
        password: ''
    });
    
    const { username, email, password } = value;

    const handleRegister = ( e ) => {
        
        e.preventDefault();

        if( username === '' && email === '' && password === '' ){
            return;
        } else {

            const person = {
                username: username,
                email: email,
                password: password
            }

            // const data = RegisterUserAPI( person );

            // data
            //     .then( response => {
            //         if ( response.ok){
            //             setTimeout( () => {
            //                 history.push( '/login' )
            //             }, 500)
            //         }else{
            //             return ;
            //         }
            //     } )

        }

    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">NoteApp - Registrate</h2>
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
                            <label>Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Email"
                                name="email"
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

export default RegisterScreen;