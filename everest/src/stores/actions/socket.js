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
    }
}

const socketConnectSuccess = () => {
    return {
        type: actionTypes.SOCKET_CONNECT_SUCCESS
    }
}

const socketConnectFail = () => {
    return {
        type: actionTypes.SOCKET_CONNECT_FAIL
    }
}

export const socketConnect = (user) => {
    return dispatch => {
        dispatch(socketConnectStart());
        console.log('Socket connection on client successfully');
        const {_id, slug} = user;
        console.log(socket.emit());
        socket.emit('joinedserver', {_id,slug},
        err => {
            console.log(err);
        });
    }
}