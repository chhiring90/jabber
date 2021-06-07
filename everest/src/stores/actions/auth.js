import * as actionTypes from './actionTypes';
import axios from 'axios';

axios.defaults.withCredentials = true;

const signupStart = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_START,
    }
};

const signupSuccess = (message) => {
    return {
        type: actionTypes.AUTH_SIGNUP_SUCCESS,
        message: [actionTypes.MESSAGE_SUCCESS, message]
    }
};

const signupFail = (message) => {
    return {
        type: actionTypes.AUTH_SIGNUP_FAIL,
        message: [actionTypes.MESSAGE_ERROR, message]
    }
};

const onLoginStart = () => {
    return {
        type: actionTypes.AUTH_LOGIN_START
    }
}

const onLoginSuccess = (message, token) => {
    return {
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        message: [actionTypes.MESSAGE_SUCCESS, message],
        token
    }
}

const onLoginFail = (message) => {
    return {
        type: actionTypes.AUTH_LOGIN_FAIL,
        message: [actionTypes.MESSAGE_ERROR, message]
    }
}

export const setAuthPathRedirect = (path)=> {
    return {
        type: actionTypes.SET_AUTH_PATH_REDIRECT,
        path
    }
};

export const signup = (name, email, password, passwordConfirm) => {
    return async dispatch => {
        try {
            dispatch(signupStart());
            const signupData = {
                name,
                email,
                password,
                passwordConfirm
            }
            const url = 'http://127.0.0.1:5000/api/v1/users/signup';
            const res = await axios({
                method: 'POST',
                url,
                data: signupData
            });

            console.log(res.data);

            if (res.data.status === 'success') {
                dispatch(signupSuccess('Sign up Successfully!'));
            }
        } catch (err) {
            console.log(err.response.data.message);
            dispatch(signupFail(err.response.data.message));
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            dispatch(onLoginStart());
            const loginData = {
                email,
                password
            }

            const url = 'http://127.0.0.1:5000/api/v1/users/login';
            const res = await axios({
                method: 'POST',
                url,
                data: loginData
            });

            if (res.data.status === 'success') {
                dispatch(onLoginSuccess('Login successfully!', res.data.token));
            }
        } catch (err) {
            console.log(err.response.data.message);
            dispatch(onLoginFail(err.response.data.message));
        }
    }
}

export const checkAuthState = () => {
    return async dispatch => {
        try {
            const url = 'http://127.0.0.1:5000/api/v1/users/authorize';
            const res = await axios({
                method: 'GET',
                url,
            });

            if (res.data.status === 'success') {
                dispatch(onLoginSuccess(null, true));
            }
        } catch (err) {
            console.log(err.response.data.message);
            dispatch(onLoginFail());
        }
    }
}