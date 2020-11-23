import React from 'react';
import {Redirect as RouteRedirect} from "react-router-dom";

export const commonHelper = {
    redirectIfLoggedIn: (auth) => {
        if(auth){
            return <RouteRedirect to="/auth/login" />;
        }
    }
};