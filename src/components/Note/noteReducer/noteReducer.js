import { noteTypes } from "../../../types/types"

export const noteReducer = ( state = [], action ) => {
    switch ( action.type ) {
        case noteTypes.note_fetching:
            return {
                ...state,
                isFetching: true,
                hasError: false
            }
        case noteTypes.note_success:
            return {
                ...state,
                isFetching: true,
                notes: action.payload
            }
        case noteTypes.note_failed:
            return {
                ...state,
                isFetching: false,
                hasError: true
            }
        default:
            return state;
    }
};