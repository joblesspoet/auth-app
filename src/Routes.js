import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
  } from "react-router-dom";

import Login from './components/Auth/Login/Login';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import Signup from './components/Auth/Signup/Signup';
import PageNotFound from './components/404/PageNotFound';
import Home from './components/Home/Home';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/auth/login" component={Login} />
                <Route exact path="/auth/register" component={Signup} />
                {/* <Route exact path="/auth/reset-password" component={ResetPassword} /> */}
                <PrivateRoute path="/auth/reset-password" component={ResetPassword} />
                <Route isAuth path="*">
                    <PageNotFound />
                </Route>
            </Switch>   
        </Router>
    )
}

function PrivateRoute({ component: Component, ...rest }) {
    return (<Route {...rest} render={ props => (    
        rest.isAuth === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/auth/login',
            state: { from: props.location }
            }}
          />
        )
      )} />)
}

export default Routes
