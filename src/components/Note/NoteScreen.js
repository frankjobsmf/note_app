import axios from 'axios';
import React, { useContext, useEffect, useState} from 'react';
import { useReducer } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { noteTypes } from '../../types/types';
import { urlNotes } from '../../urls/endpointsNotes';
import { NoteCard } from './NoteCard';
import { noteReducer } from './noteReducer/noteReducer';
import { useHistory } from 'react-router-dom';
import { validateToken } from '../../auth/validateToken';

const initialState = {
    notes: [],
    isFetching: false,
    hasError: false,
}

const NoteScreen = () => {
    
    const [ready, setReady] = useState(false);
    const [state, dispatch] = useReducer(noteReducer, initialState);
    const { dispatch: dispatchUser } = useContext( AuthContext );
    const history = useHistory();
    const access_token = JSON.parse( localStorage.getItem( 'access' ) );
    
    
    useEffect( () => {
        
        validateToken( dispatchUser, history ); 
        
        dispatch({
            type: noteTypes.note_fetching
        })

        axios.get( urlNotes.getNotesByIdUser, {
            headers: { 
                'Authorization': access_token , 
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
        .then( resp => {
            
            setReady(true);
            
            const notes_list = resp.data.notes;

            dispatch({
                type: noteTypes.note_success,
                payload: notes_list
            });
        })
        .catch( error => {
            
            console.log(error);

            dispatch({
                type: noteTypes.note_failed
            });
        });

    },[ ready ] );
    
    const postList = typeof( state.notes ) === 'undefined' || state.notes.length === 0 ? [] :
    state.notes.length ? (
        state.notes.map( note => {
            return <NoteCard 
                key={ note.id }
                id={note.id}
                title={note.title}
                content={note.content}
                date={note.date}
            />
        })
    ) : (
        <p className="text-center">Vaya, parece que aun no tienes notas creadas!</p>
    )

    return (
        <>
            <div className="container mt-3 animate__animated animate__fadeIn">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        state.hasError ? (
                            <span>HUBO UN ERROR!!!</span>
                        ) : (
                            postList
                        )
                    }
                </div>
            </div>  
        </>
    )
}

export default NoteScreen;