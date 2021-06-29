// import React, { useEffect, useState } from 'react';
import { useFetchNote } from '../../hooks/useFetchNote';
import { NoteCard } from './NoteCard';

const NoteScreen = () => {

    const value = useFetchNote();

    const { data } = value;
    // const { data, loading } = value;

    return (
        <>
            <div className="container mt-3 animate__animated animate__fadeIn">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                       typeof data !== 'undefined' ? 
                            data.map( nt => (
                                <NoteCard 
                                    key={ nt.id }
                                    id={nt.id}
                                    title={nt.title}
                                    content={nt.content}
                                    date={nt.date}
                                />
                            ) )

                            :
                            ''
                    }
                </div>

                

            </div>  
        </>
    )
}

export default NoteScreen;