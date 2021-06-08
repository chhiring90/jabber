import * as actionTypes from './actionTypes';
import axios from '../../axios-api';

axios.defaults.withCredentials = true;

const signupStart = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_START,
    }
};

const signupSuccess = (message, token, user) => {
    return {
        type: actionTypes.AUTH_SIGNUP_SUCCESS,
        message: [actionTypes.MESSAGE_SUCCESS, message],
        token,
        user
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

const onLoginSuccess = (message, token, user) => {
    return {
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        message: [actionTypes.MESSAGE_SUCCESS, message],
        token,
        user
    }
}

const onLoginFail = (message) => {
    return {
        type: actionTypes.AUTH_LOGIN_FAIL,
        message: [actionTypes.MESSAGE_ERROR, message]
    }
}

const onLogoutStart = (message) => {
    return {
        type: actionTypes.AUTH_LOGOUT_START,
    }
}

const onLogoutSuccess = (message) => {
    return {
        type: actionTypes.AUTH_LOGOUT_SUCCESS
    }
}

const onLogoutFail = (message) => {
    return {
        type: actionTypes.AUTH_LOGOUT_FAIL,
        message: [actionTypes.MESSAGE_ERROR, message]
    }
}

export const setAuthPathRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_PATH_REDIRECT,
        path
    }
};

export const signup = (name, email, password, passwordConfirm) => {
    return dispatch => {
        dispatch(signupStart());
        const signupData = {
            name,
            email,
            password,
            passwordConfirm
        };
        axios.post('/users/signup', signupData).then(res => {
            const {token, status} = res.data;
            if (status === 'success') {
                dispatch(signupSuccess('Sign up Successfully!', token, res.data.data.user));
            }
        }).catch(err => {
            console.log(err.response.data.message);
            dispatch(signupFail(err.response.data.message));
        });
    }
}

export const login = (email, password) => {
    return dispatch => {
        dispatch(onLoginStart());
        const loginData = {
            email,
            password
        };
        axios.post('/users/login', loginData)
            .then(res => {
                const {token, status} = res.data;
                if (status === 'success') {
                    dispatch(onLoginSuccess('Login successfully!', token, res.data.data.user));
                }
            }).catch(err => {
                console.log(err.response.data.message);
                dispatch(onLoginFail(err.response.data.message));
            });
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(onLogoutStart());
        axios.get('/users/logout').then(res => {
            if(res.data.status === 'success') {
                dispatch(onLogoutSuccess());
            }
        }).catch(err => {
            console.log(err.response.data);
            dispatch(onLogoutFail(err.response.data.message));
        });
    }
}

export const checkAuthState = () => {
    return dispatch => {
        axios.get('/users/authorize').then(res => {
                const {user} = res.data.data;
            if (res.data.status === 'success') {
                dispatch(onLoginSuccess(null, true, user));
            }
        }).catch(err => {
            console.log(err.response.data.message);
            dispatch(onLoginFail());
        });
    }
}