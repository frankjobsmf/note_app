import { noteTypes } from "../types/types";

const initialState = {
    notes: []
};

export const noteReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case noteTypes.note_success:
        
            return {
                ...state,
                notes: [ ...action.payload ]
            };

        case noteTypes.note_add:

            console.log( action.payload );

            return {
                ...state,
                notes: [ action.payload ]
            };

        case noteTypes.note_logout:
            return { notes: [] };
    
        default:
            return state;
    }
};