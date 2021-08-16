import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { validateToken } from '../../auth/validateToken';
import { deleteNoteById, getNoteById, updateNoteById } from '../../helpers/noteService';
import { urlNotes } from '../../urls/endpointsNotes';

const Note = () => {

    const { id } = useParams();
    const access_token = JSON.parse( localStorage.getItem( 'access' ) );
    const { dispatch: dispatchUser } = useContext( AuthContext );
    const history = useHistory();
    
    const [inputTitleContent, setinputTitleContent] = useState({
        title: '',
        content: ''
    });

    
    useEffect( () => {
        
        validateToken( dispatchUser, history );
        axios.get( `${urlNotes.getNoteById}${id}`, {
            headers: {
                'Authorization': access_token, 
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
        .then( resp => {
            console.log(resp.data.note);

            const { title, content } = resp.data.note;
            setinputTitleContent({
                title: title, content: content
            });

        })
    },[id]);
    
    
    const handleInputChange = ({ target }) => {
        setinputTitleContent({
            ...inputTitleContent,
            [ target.name ]: target.value
        })
    }
    
    const { title, content } = inputTitleContent;
    
    //objeto note
    const noteObject = {
        title: title,
        content: content
    }
    
    const handleUpdateNote = (e) => {
        e.preventDefault();

        if( title === '' && content === '' ){
            return;
        }

        updateNoteById(id, noteObject);
        setTimeout( () => {
            history.replace('/');
        }, 500 );
    }

    const handleDeleteNote = () => {
        deleteNoteById( id );
        setTimeout( () => {
            history.replace('/');
        }, 500 );
    }
    
    return (
        <div className="row m-4 d-flex justify-content-center">
                    <div className="col-sm-8">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Titulo</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="title"
                                    value={title}
                                    onChange={ handleInputChange }
                                    autoComplete="off"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contenido</label>
                                <textarea 
                                    rows="4" 
                                    cols="50" 
                                    className="form-control"
                                    name="content"
                                    value={content}
                                    onChange={ handleInputChange }
                                    autoComplete="off"
                                />
                            </div>

                            <button 
                type="button" 
                className="btn btn-outline-danger"
                onClick={ handleDeleteNote }
                >Eliminar
            </button>
            <button 
                type="button" 
                className="btn btn-outline-warning m-2"
                onClick={ handleUpdateNote }
                >Actualizar
            </button>
                        </form> 
                    </div>       
                </div>
    )
}

export default Note;