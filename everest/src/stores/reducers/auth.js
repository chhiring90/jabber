import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utilty';

const initialState = {
    jwtToken: null,
    userId: null,
    error: null,
    message: [],
    loading: false,
    authRedirectPath: '/',
    isAuthenticated: false
};

const authSignupStart = (state, action) => {
    return updateObject(
        state,
        {
            loading: true
        }
    )
}

const authSignupSuccess = (state, action) => {
    return updateObject(
        state,
        {
            isAuthenticated: true,
            loading: false,
            message: action.message
        }
    );
};

const authSignupFail = (state, action) => {
    return updateObject(
        state, {
        message: action.message,
        loading: false,
    });
};

const authLoginStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const authLoginSuccess = (state, action) => {
    return updateObject(state, {
        isAuthenticated: true,
        loading: false,
        message: action.message,
    });
}

const authLoginFail = (state, action) => {
    return updateObject(state, {
        message: action.message,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.AUTH_SIGNUP_START: return authSignupStart(state, action);

        case actionType.AUTH_SIGNUP_SUCCESS: return authSignupSuccess(state, action);

        case actionType.AUTH_SIGNUP_FAIL: return authSignupFail(state, action);

        case actionType.AUTH_LOGIN_START: return authLoginStart(state, action);

        case actionType.AUTH_LOGIN_SUCCESS: return authLoginSuccess(state, action);

        case actionType.AUTH_LOGIN_FAIL: return authLoginFail(state, action);

        default: return state;
    };
};

export default reducer;