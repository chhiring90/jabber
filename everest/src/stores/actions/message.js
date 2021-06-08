import * as actionTypes from '../actions/actionTypes';

const onMessageStart = (type, message) => {
    return {
        type: actionTypes.SEND_MESSAGE_START,
        loading: true
    }
}


const sendMessage = (message) => {
    
}