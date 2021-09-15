import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginScreen from '../components/Login/LoginScreen';
import RegisterScreen from '../components/Login/RegisterScreen';
import { DashboardRoutes } from './DashboardRoutes';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {

    const userAuth = useSelector(state => state.auth);

    const { isLoggedIn } = userAuth;

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact isAuthenticated={ isLoggedIn } path="/login" component={ LoginScreen }/>
                    <PublicRoute exact isAuthenticated={ isLoggedIn } path="/register" component={ RegisterScreen }/>
                    <PrivateRoute  path="/" isAuthenticated={ isLoggedIn } component={ DashboardRoutes }/>
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter;