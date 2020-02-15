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
import {
    config
} from 'react-transition-group';

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
        'xauthtoken': null
    }

    // Get token from localstorage
    const token = getState().auth.token;
    if (token) {
        config.xauthtoken = token;
    }

    return config;
}