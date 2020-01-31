import {
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING
} from "./types";

import axios from "axios";

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/items/')
        .then(res => {
            var json = JSON.parse(JSON.stringify(res.data).split('"_id":').join('"id":'));
            dispatch({
                type: GET_ITEMS,
                payload: json
            })
        })
}


export const addItem = item => dispatch => {
    dispatch(setItemsLoading());
    axios.post('/items/', item)
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        )
};

export const deleteItem = id => {
    return {
        type: DELETE_ITEM,
        payload: id
    };
};



export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};