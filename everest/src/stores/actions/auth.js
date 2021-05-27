import * as actionType from './actionTypes';
import axios from 'axios';

export const signupStart = () => {
    return {
        type: actionType.AUTH_SIGNUP_START
    }
};

export const signup = () => {
    return dispatch => {
        console.log(dispatch);
    }
}