import * as actionTypes from '../actions/actionTypes';

const sendMessageStart = () => {
    return {
        type: actionTypes.SEND_MESSAGE_START,
        loading: true
    }
}

const sendMessageSuccess = (message) => {
    return {
        type: actionTypes.SEND_MESSAGE_SUCCESS,
        loading: false,
        message
    }
}

const sendMessageFail = (error) => {
    return {
        type: actionTypes.SEND_MESSAGE_FAIL,
        loading: false,
        error
    }
}


const sendMessage = (message) => {
    
}