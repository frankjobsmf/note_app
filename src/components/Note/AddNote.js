import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { addNoteAction } from '../../actions/notes';
import { useHistory } from 'react-router-dom';


const AddNote = () => {
    

    const history = useHistory();
    const dispatch = useDispatch();

    const [ value, handleInputChange ] = useForm({
        'title': '',
        'content': '',
    });

    const { title, content } = value;

    const handleAddNote = (e) => {
        e.preventDefault();

        dispatch( addNoteAction( title, content ) );
        history.push('/');
    };



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
                        type="submit" 
                        className="btn btn-outline-success"
                        onClick={ handleAddNote }
                    >Agregar
                    </button>
                </form> 
            </div>       
        </div>
    )
}

export default AddNote;
