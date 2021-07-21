import React, { useEffect} from 'react';
import { useReducer } from 'react';
import { noteTypes } from '../../types/types';
import { NoteCard } from './NoteCard';
import { noteReducer } from './noteReducer/noteReducer';

const initialState = {
    notes: [],
    isFetching: false,
    hasError: false,
}

const NoteScreen = () => {
    
    const [state, dispatch] = useReducer(noteReducer, initialState);
    
    const user = JSON.parse( localStorage.getItem( 'user' ) );

    const { token } = user;


    useEffect( () => {
        dispatch({
            type: noteTypes.note_fetching,
        });

        fetch('http://127.0.0.1:8000/api/notes-userid', {
            method: 'GET',
            headers: {
                Authorization: token
            },
            mode: 'cors',
            cache: 'default'
        })
            .then( resp => {
                if (resp.ok){
                    return resp.json();
                } else {
                    throw resp;
                }
            })
            .then( respJson => {
                
                const { notes } = respJson;
                
                console.log(notes);
                dispatch({
                    type: noteTypes.note_success,
                    payload: notes
                });
            })
            .catch( error => {
                console.log(error);

                dispatch({
                    type: noteTypes.note_failed
                });
            });
    }, [token]);
    
    return (
        <>
            <div className="container mt-3 animate__animated animate__fadeIn">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        state.hasError ? (
                            <span>HUBO UN ERROR!!!</span>
                        ) : (
                            state.notes.length > 0 &&
                                state.notes.map( nt => (
                                    <NoteCard 
                                        key={ nt.id }
                                        id={nt.id}
                                        title={nt.title}
                                        content={nt.content}
                                        date={nt.date}
                                    />
                                ))
                        )
                    }
                </div>

                

            </div>  
        </>
    )
}

export default NoteScreen;