import { authTypes } from "../types/types";
import { registerService, loginService, logoutService } from "../helpers/userService";

export const registerAction = ( username, email, password ) => (dispatch) => {
    return registerService( username, email, password ).then(
        ( response ) => {
            dispatch({
                type: authTypes.register,
            });
        }
    );
};

export const loginAction = (username, password) => (dispatch) => {
    return loginService( username, password ).then(
        ( data ) => {
            dispatch({
                type: authTypes.login,
                payload: { user: data }
            });

            return Promise.resolve();
        }
    );
};

export const logoutAction = () => ( dispatch ) => {
    logoutService();

    dispatch({
        type: authTypes.logout
    });
};