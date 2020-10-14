import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Login from './components/Auth/Login/Login';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import Signup from './components/Auth/Signup/Signup';

import Home from './components/Home/Home';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" >
                    <Home />
                </Route>
                <Route exact path="/auth/login">
                    <Login />
                </Route>
                <Route exact path="/auth/register">
                    <Signup />
                </Route>
                <Route exact path="/auth/reset-password">
                    <ResetPassword />
                </Route>
            </Switch>   
        </Router>
    )
}

export default Routes
