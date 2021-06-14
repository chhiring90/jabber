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

const createdRoomStart = () => {
    return {
        type: actionTypes.CREATE_ROOM,
    }
}

const createdRoomSuccess = (room) => {
    return {
        type: actionTypes.CREATE_ROOM_SUCCESS,
        room 
    }
}

const createdRoomFail = (error) => {
    return {
        type: actionTypes.CREATE_ROOM_FAIL,
        error
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

export const sendCreateRoom = (roomInfo) => {
    return dispatch => {
        socket.emit('createroom', roomInfo);
    }
}

export const createdRoom = (roomId) => {
    return dispatch => {
        dispatch(createdRoomStart());
        window.history.pushState({}, null, `/chats/?room=${roomId}`);
        axios.get(`/rooms/${roomId}`).then(res => {
            console.log(res.data);
            if(res.data.status === 'success'){
                dispatch(createdRoomSuccess(res.data.data));
            }
        }).catch(err => {
            console.log(err.response.data.message);
            dispatch(createdRoomFail(err.response.data.message));
        });
    }
}