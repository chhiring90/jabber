import * as actionType from '../actions/actionTypes';

const initialState = {
    jwtToken: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    isAuthenticated: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default reducer;