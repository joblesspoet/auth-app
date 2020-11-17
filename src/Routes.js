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
import {useSelector} from 'react-redux'

function Routes() {
  const isAuth = useSelector(state => state.auth.is_logged_in);
  
  return (
        <Router>
            <Switch>
                <PublicRoute path="/">
                  <Login />
                </PublicRoute>
                <PublicRoute path="/auth/login">
                  <Login />
                </PublicRoute>
                <PublicRoute path="/auth/register">
                  <Signup />
                </PublicRoute>
                <PublicRoute path="/auth/reset-password">
                  <ResetPassword />
                </PublicRoute>
                <PublicRoute path="/dashboard">
                  <Home />
                </PublicRoute>

                <PrivateRoute isAuth={isAuth} path="/dashboard" component={Home} />
                <Route path="*">
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

const PublicRoute = ({ children, ...rest }) => {
  const isLogged = useSelector(state => state.auth.is_logged_in);

  return (
      <Route
          {...rest}
          render={() => {
              if (isLogged) {
                  return <Redirect to="/dashboard" />;
              }

              return children;
          }}
      />
  );
};

export default Routes
