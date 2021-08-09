import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useReducer } from 'react';
import { noteTypes } from '../../types/types';
import { urlNotes } from '../../urls/endpointsNotes';
import { urlUser } from '../../urls/endpointsUser';
import { NoteCard } from './NoteCard';
import { noteReducer } from './noteReducer/noteReducer';

const initialState = {
    notes: [],
    isFetching: false,
    hasError: false,
}

const NoteScreen = () => {
    
    const jwt = require('jsonwebtoken');

    const [ready, setReady] = useState(false);

    const [state, dispatch] = useReducer(noteReducer, initialState);

    const access_token = JSON.parse( localStorage.getItem( 'access' ) );
    const refresh_token = JSON.parse( localStorage.getItem( 'refresh' ) );
    
    let decoded_token = jwt.decode( access_token, {complete: true} );

    let dateNow = new Date();

    if ( decoded_token.payload.exp * 1000 < dateNow.getTime()){
        console.log('Expired')

        axios.post( urlUser.refresh, {refresh_token}, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        })
        .then( resp => {

            console.log(resp.data);

            const { access_token, refresh_token } = resp.data;

            localStorage.setItem('access', JSON.stringify(access_token));
            localStorage.setItem('refresh', JSON.stringify(refresh_token));
        })
    }else {
        console.log( 'valid');
    }
    
    
    
    useEffect( () => {
        
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

            console.log( notes_list );

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
    
    const postList = state.notes.length ? (
        state.notes.map( note => {
            return <NoteCard 
                key={ note.id }
                id={note.id}
                title={note.title}
                content={note.content}
                date={note.date}
            />
        })
    ): (
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