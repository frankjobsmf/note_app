import { noteTypes } from "../types/types";
import { addNote, getAllNotesByUser } from "../helpers/noteService";

export const getAllNotesByUserAction = () => (dispatch) => {

    getAllNotesByUser()
        .then( n => {

            if ( !n ){
                
                dispatch({
                    type: noteTypes.note_success,
                    payload: []
                });
            } else {

                dispatch({
                    type: noteTypes.note_success,
                    payload: n
                });
            }

        });


};


export const addNoteAction = ( title, content ) => ( dispatch ) => {

    addNote( title, content );

    dispatch( { type: noteTypes.note_add} );

};
