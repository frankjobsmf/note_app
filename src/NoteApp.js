import React from 'react';
import { Provider } from 'react-redux';
import { useHistory } from 'react-router';
import AppRouter from './routers/AppRouter';
import { store } from './store/store';


const NoteApp = () => {

    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
};

export default NoteApp