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
        
    },[])
    
    
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
        }, 1500 );
    }

    const handleDeleteNote = () => {
        deleteNoteById( id );
        setTimeout( () => {
            history.goBack();
        }, 1500 );
    }
    
    return (
        <>
            <form>
            <div className="mb-3">
                <label 
                    className="form-label"
                >Título
                </label>
                <input 
                    type="text"
                    className="form-control"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-3">
                <label 
                    className="form-label"
                >Contenido
                </label>
                <textarea 
                    className="form-control" 
                    rows="5"
                    name="content"
                    value={content}
                    onChange={handleInputChange}
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
        </>
    )
}

export default Note;