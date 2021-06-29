import { useEffect, useState } from "react";
import { getNoteById, getNotes } from "../helpers/noteService";

export const useFetchNote = () => {
    const [ value, setValue ] = useState({
        data: [],
        loading: true
    })

    useEffect( () => {
        getNotes().then( resp => {
            setTimeout( () => {
                setValue({
                    data: resp,
                    loading: false
                });
            }, 500 );
        });
    }, [] );

    return value;

};

export const useFetchNoteById = ( id = null ) => {
    const [ value, setValue ] = useState({
        data: []
    });

    useEffect( () => {
        getNoteById( id ).then( resp => {
            setTimeout( () => {
                setValue({
                    data: resp
                });
            } );
        } );
    }, []);
    return value;
};