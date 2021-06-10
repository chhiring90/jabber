import * as actionTypes from './actionTypes';
import axios from '../../axios-api';

const fetchUser = () => {
    return {
        type: actionTypes.FETCH_USER,
        loading: true
    }
}

const fetchUserSucces = (data) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        loading: false,
        data
    }
}

const fetchUserFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        loading: false,
        error
    }
}

export const onFetchUser = (currentUserId) => {
    return dispatch => {
        dispatch(fetchUser());
        axios.get('/users').then(res => {
            if(res.data.status === 'success'){
                let users = [...res.data.data];
                let filteredCurrentUser = users.filter(user => user.id !== currentUserId);
                dispatch(fetchUserSucces(filteredCurrentUser));
            }
        }).catch(err => {
            console.log(err.response.data.message);
            dispatch(fetchUserFail(err.response.data.message));
        });
    }
}