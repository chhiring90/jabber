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

const createdRoomSuccess = (room, slug) => {
    return {
        type: actionTypes.CREATE_ROOM_SUCCESS,
        room,
        slug
    }
}

const createdRoomFail = (error) => {
    return {
        type: actionTypes.CREATE_ROOM_FAIL,
        error
    }
}

const joinedServerStart = () => {
    return {
        type: actionTypes.SOCKET_JOINED_SERVER,
        loading: true
    }
}

const joinedServerSuccess = (userId) => {
    return {
        type: actionTypes.SOCKET_JOINED_SUCCESS,
        loading: false,
        userId
    }
}

const joinedServeFail = (error) => {
    return {
        type: actionTypes.SOCKET_JOINED_FAIL,
        loading: false,
        error
    }
}

const disconnectSuccessful = (userId) => {
    return {
        type: actionTypes.SOCKET_DISCONNECT_SERVER,
        userId
    }
}

export const fetchUser = (currentUserId) => {
    return dispatch => {
        dispatch(fetchUserStart());
        axios.get('/users').then(res => {
            if (res.data.status === 'success') {
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

export const joinedServer = (userId) => {
    return dispatch => {
        dispatch(joinedServerStart());
        if (!userId) return dispatch(joinedServeFail());
        dispatch(joinedServerSuccess(userId));
    }
}

export const disconnectServer = (userId) => {
    return dispatch => {
        console.log(userId, 'Left the server');
        dispatch(disconnectSuccessful(userId));
    }
}

export const sendCreateRoom = (roomInfo) => {
    return dispatch => {
        socket.emit('createroom', roomInfo);
    }
}

export const createdRoom = (room, slug) => {
    return dispatch => {
        dispatch(createdRoomStart());
        window.history.pushState({}, null, `/chats/?room=${room._id}`);
        if(!room) return dispatch(createdRoomFail('Something went wrong!'));
        dispatch(createdRoomSuccess(room, slug));
    }
}