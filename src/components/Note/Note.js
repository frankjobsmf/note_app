import React from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { urlNotes } from '../../urls/endpointsNotes';

const Note = () => {
    
    const handleInputChange = ({ target }) => {
    }
    
    const handleUpdateNote = (e) => {
        e.preventDefault();
    }

    const handleDeleteNote = () => {
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