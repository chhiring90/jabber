import * as actionType from '../actions/actionTypes';

import { updateObject } from '../../shared/utilty';

const initialState = {
    jwtToken: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    isAuthenticated: false
};

const authSignupSuccess = (state, action) => {
    return updateObject(
        ...state,
        { isAuthenticated: true }
    );
};

const authSignupFail = (state, action) => {
    return updateObject(
        ...state, {
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    debugger;
    switch (action.type) {
        case actionType.AUTH_SIGNUP_SUCCESS: return authSignupSuccess(state, action);

        case actionType.AUTH_SIGNUP_FAIL: return authSignupFail(state, action);

        default: return state;
    };
};

export default reducer;