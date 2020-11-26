import React from 'react';
import {Redirect as RouteRedirect} from "react-router-dom";

export const commonHelper = {
    redirectIfLoggedIn: (auth) => {
        if(auth){
            return <RouteRedirect to="/auth/login" />;
        }
    }
};

export const sortArray = (array_object) => {
    return array_object.sort((a, b) => (a.id > b.id ? -1 : 1))
}