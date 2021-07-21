import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

const Navbar = () => {

    const { user, dispatch } = useContext(AuthContext);
    
    const history = useHistory();    

    const handleLogout = () => {
        dispatch({
            type: types.logout
        });

        history.replace('/login');
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                NoteApp
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/profile"
                    >
                        Perfil
                    </NavLink>
                </div>
                <div className="navbar-nav">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/add-note"
                    >
                        Crear
                    </NavLink>
                </div>
            </div>

            


            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 position-relative">      
                <ul className="navbar-nav ml-auto">
                    <span className="nav-item nav-link text-info ">
                        { user.username }
                    </span>
                    
                    <button 
                        onClick={ handleLogout }
                        className="nav-item nav-link btn position-absolute top-0 end-0" 
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;