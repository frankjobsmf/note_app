import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotesByUserAction } from '../../actions/notes';
import { NoteCard } from './NoteCard';

const NoteScreen = () => {
    const dispatch = useDispatch();
    const { notes } = useSelector(state => state.note);


    useEffect(() => {
        dispatch( getAllNotesByUserAction() );
    }, []);


    return (
        <>
            <div className="container mt-3 animate__animated animate__fadeIn">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {

                        notes.map((note) => (
                            <NoteCard 
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                content={note.content}
                                date={note.date}
                            />
                        ))

                    }
                </div>
            </div>  
        </>
    )
};

export default NoteScreen;