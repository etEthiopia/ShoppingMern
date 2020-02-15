import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('shopingtoken'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                    isLoading: false,
                    user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                    isAuthenticated: true,
                    isLoading: false
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.removeItem('shopingtoken');
            return {
                ...state,
                token: null,
                    user: null,
                    isAuthenticated: true,
                    isLoading: false
            };
        default:
            return state;

    }
}