import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS
} from "./types";

import {
    returnErrors
} from './errorActions';


// Check token and load user

export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({
        type: USER_LOADING
    });


    axios.get('/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// Setup Config
export const tokenConfig = getState => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }

    }

    // // Get token from localstorage
    const token = getState().auth.token;
    
    if (token) {
        config.headers['xauthtoken'] = token;
    }

    return config;


}

// Register User
export const register = (user) => dispatch => {
    axios.post('/users', user)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })

}

// Login User
export const login = (user) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.post('/auth', user, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })

}


export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}