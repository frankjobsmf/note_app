import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AddNote from '../components/Note/AddNote';
import Note from '../components/Note/Note';
import NoteScreen from '../components/Note/NoteScreen';
import NavBar from '../components/UI/NavBar';


export const DashboardRoutes = () => {

    return (
        <>
            <NavBar />
            <div className='container mt-2'>
                <Switch>
                    <Route exact path="/" component={ NoteScreen }/>
                    <Route exact path="/note/:id" component={ Note }/>
                    <Route exact path="/add-note" component={ AddNote }/>
                    <Redirect to="/"/>

                </Switch>
            </div>  
        </>
    )
}
