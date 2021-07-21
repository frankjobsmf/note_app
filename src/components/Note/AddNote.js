import React from 'react';
import { useForm } from '../../hooks/useForm';


const AddNote = ({ history }) => {

    const user = JSON.parse( localStorage.getItem( 'user' ) ) || { logged: false};

    const { token } = user;

    const [ value, handleInputChange ] = useForm({
        title: '',
        content: '',
    });

    const { title, content } = value;


    //objeto note
    const noteObject = {
        title: title,
        content: content
    }
    
    const handleAddNote = (e) => {
        e.preventDefault();

        if( title === '' && content === '' ){
            return;
        }

        fetch('http://127.0.0.1:8000/api/add', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(noteObject)
        })


        setTimeout( () => {
            history.push('/');
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
