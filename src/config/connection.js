import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const API_INSTANCE = axios.create({
    // baseURL: "http://10.28.87.112:8001/api",
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        'Accept': 'application/json'
    }
});

API_INSTANCE.interceptors.request.use(conf => {
    return conf;
})

const API_INTERCEPTOR = (store) => {
    
    // Response interceptor for API calls
    API_INSTANCE.interceptors.request
        .use(
            async (conf) => {
                    const auth = await store.getState();
                    if (auth.auth.access_token && !conf.headers.Authorization) {
                        conf.headers.Authorization = `Bearer ${auth.auth.access_token}`;
                    }
                    return conf;
                },
                (error) => {
                    return Promise.reject(error);
                }
        );

    // Response interceptor for API calls
    API_INSTANCE.interceptors.response.use((response) => {
        return response.data;
    }, async function (error) {
        const originalRequest = error.config;        
        if (error.response?.status === 403 && !originalRequest._retry) {
            console.log('token expired');
            return (<Redirect to='/auth/login' />);           
        }

        return Promise.reject(error);
    });
};

// const refreshAccessToken = (token) => {
//     API_INSTANCE.post('/auth/refresh',{token: token})
//     .then(resp => resp.json())
//     .then(data => {

//     }, (error) => console.log(error)).catch(error => {
//         console.log(error);
//     })
// }

export {
    API_INSTANCE,
    API_INTERCEPTOR
};
