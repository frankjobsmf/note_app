import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { deleteNoteById, getNoteById, updateNoteById } from '../../helpers/noteService';

const Note = ({ history }) => {

    const { id } = useParams();

    
    const [inputTitleContent, setinputTitleContent] = useState({
        title: '',
        content: ''
    });


    
    useEffect( () => {
        getNoteById( id ).then( resp => {
            
            const { title, content } = resp.note;
            
            setTimeout( () => {
                setinputTitleContent({
                    title: title, content: content
                });
            }, 500);
        } )
        
    },[id])
    
    
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
            history.goBack();
        }, 500 );
    }

    const handleDeleteNote = () => {
        deleteNoteById( id );
        setTimeout( () => {
            history.goBack();
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