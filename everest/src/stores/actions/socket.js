import * as actionTypes from './actionTypes';
import socket from '../../socket';

export const socketInit = () => {
    return {
        type: actionTypes.SOCKET_INIT,
    }
}

const socketConnectStart = () => {
    return {
        type: actionTypes.SOCKET_CONNECT,
        loading: true
    }
}

const socketConnectSuccess = () => {
    return {
        type: actionTypes.SOCKET_CONNECT_SUCCESS,
        loading: false
    }
}

const socketConnectFail = (error) => {
    return {
        type: actionTypes.SOCKET_CONNECT_FAIL,
        loading: false,
        error
    }
}

export const socketConnect = (user) => {
    return dispatch => {
        dispatch(socketConnectStart());
        const { _id, slug } = user;
        console.log('Socket connection on client successfully');
        socket.emit('joinserver', { _id, slug }, err => {
            dispatch(socketConnectFail(err));
        });
        dispatch(socketConnectSuccess());
    }
}