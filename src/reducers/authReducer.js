import { authTypes } from "../types/types";

const user = JSON.parse( localStorage.getItem( "user" ) );

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null};


export const authReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case authTypes.register:
            return {
                ...state,
                isLoggedIn: false
            };
    
        case authTypes.login:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user
            };

        case authTypes.logout:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };

        default:
            return state;
    }
};