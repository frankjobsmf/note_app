import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { noteReducer } from "../reducers/noteReducer";

const middleware = [thunk];

const reducers = combineReducers({
    auth: authReducer,
    note: noteReducer,
});

export const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware( ...middleware )
    )
);

