import * as actionTypes from './actionTypes';
import axios from 'axios';

export const signupStart = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_START
    }
};

export const signupSuccess = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_SUCCESS
    }
};

export const signupFail = (message) => {
    return {
        type: actionTypes.AUTH_SIGNUP_FAIL,
        message
    }
};

export const signup = (name, email, password, passwordConfirm) => {
    return dispatch => {
        dispatch(signupStart);
        const signupData = {
            name,
            email,
            password,
            passwordConfirm
        }

        const url = 'http://127.0.0.1:5000/api/v1/users/signup';
        axios({
            method: 'POST',
            url,
            data: signupData
        }).then(res => {
            if (res.data.status === 'success') {
                dispatch(signupSuccess);
            }
        }).catch(err => signupFail(err.response.data.message));
    }
}