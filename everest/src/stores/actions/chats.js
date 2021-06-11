import * as actionTypes from './actionTypes';
import axios from '../../axios-api';
import socket from '../../socket';

const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER,
        loading: true
    }
}

const fetchUserSuccess = (data) => {
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

const createRoomStart = () => {
    return {
        type: actionTypes.CREATE_ROOM,
    }
}

const createRoomSuccess = (slugs) => {
    return {
        type: actionTypes.CREATE_ROOM_SUCCESS,
        slugs 
    }
}

const createRoomFail = () => {
    return {
        type: actionTypes.CREATE_ROOM_FAIL,
    }
}

export const fetchUser = (currentUserId) => {
    return dispatch => {
        dispatch(fetchUserStart());
        axios.get('/users').then(res => {
            if(res.data.status === 'success'){
                let users = [...res.data.data];
                let filteredCurrentUser = users.filter(user => user.id !== currentUserId);
                dispatch(fetchUserSuccess(filteredCurrentUser));
            }
        }).catch(err => {
            console.log(err.response.data.message);
            dispatch(fetchUserFail(err.response.data.message));
        });
    }
}

export const createRoom = (slugs) => {
    return dispatch => {
        dispatch(createRoomStart());
        socket.emit('createRoom', slugs, err => {
            dispatch(createRoomFail(err));
        });
        dispatch(createRoomSuccess());
    }
}