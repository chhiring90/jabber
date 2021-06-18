import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utilty';

const initialState = {
    user: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    isAuthenticated: false,
    message: {
        login: null,
        signup: null
    }
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
            isAuthenticated: action.token || false,
            loading: false,
            user: action.user,
            isOnine: action.isOnine,
            message: {
                ...state.message,
                signup: action.message
            }
        }
    );
};

const authSignupFail = (state, action) => {
    return updateObject(
        state, {
        message: {
            ...state.message,
            signup: action.message
        },
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
        isAuthenticated: action.token || false,
        loading: false,
        user: action.user,
        isOnine: action.isOnine,
        message: {
            ...state.message,
            login: action.message
        },
    });
}

const authLoginFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        message: {
            ...state.message,
            login: action.message
        },
    });
}

const setAuthPathRedirect = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
}

const authLogoutStart = (state, action) => {
    return updateObject(state, {
        message: action.message,
        isAuthenticated: false
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
        case actionType.AUTH_LOGOUT_START: return authLogoutStart(state, action);
        case actionType.SET_AUTH_PATH_REDIRECT: return setAuthPathRedirect(state, action);
        default: return state;
    };
};

export default reducer;