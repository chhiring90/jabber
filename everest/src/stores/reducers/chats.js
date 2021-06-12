import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utilty';

const initialState = {
    loading: false,
    error: null,
    users: []
}

const fetchUser = (state, action) => {
    return updateObject(state, {
        loading: action.loading
    });
}

const fetchUserSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        users: action.data
    });
}

const fetchUserFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_USER: return fetchUser(state, action);
        case actions.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actions.FETCH_USER_FAIL: return fetchUserFail(state, action);
        default: return state;
    }
}

export default reducer;