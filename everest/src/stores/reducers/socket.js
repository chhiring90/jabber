import {updateObject} from '../../shared/utilty';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: false
}

const socketConnect = (state, action) => {
    return updateObject(state, {
        loading: action.loading
    });
};

const socketConnectSuccess = (state, action) => {
    return updateObject(state, {
        loading: action.loading
    });
};

const socketConnectFail = (state, action) => {
    return updateObject(state, {
        loading: action.loading,
        error: action.error
    })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SOCKET_CONNECT: return socketConnect(state, action);
        case actionTypes.SOCKET_CONNECT_SUCCESS: return socketConnectSuccess(state, action);
        case actionTypes.SOCKET_CONNECT_FAIL: return socketConnectFail(state, action);
        default: return state;
    }
};

export default reducer;