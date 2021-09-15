import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { authTypes, noteTypes } from '../../types/types';

const Navbar = () => {

    const dispatch = useDispatch();
    const history = useHistory();    

    const handleLogout = () => {

        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        dispatch({
            type: noteTypes.note_logout
        })

        dispatch({
            type: authTypes.logout
        });

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
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
                        to="/add-note"
                    >
                        Crear
                    </NavLink>
                </div>
            </div>

            


            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">      
                <ul className="navbar-nav ml-auto">
                    <button 
                        onClick={ handleLogout }
                        className="nav-item nav-link btn" 
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;