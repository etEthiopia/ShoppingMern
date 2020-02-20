import {
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING
} from "./types";

import axios from "axios";
import {
    tokenConfig
} from './authActions';
import {
    returnErrors
} from './errorActions';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/items/')
        .then(res => {
            var json = JSON.parse(JSON.stringify(res.data).split('"_id":').join('"id":'));
            dispatch({
                type: GET_ITEMS,
                payload: json
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}


export const addItem = item => (dispatch, getState) => {
    dispatch(setItemsLoading());
    axios.post('/items/', item, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        ).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

export const deleteItem = id => (dispatch, getState) => {
    axios.delete('/items/' + id, tokenConfig(getState)).then(res =>
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};



export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};