import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utilty';

const initialState = {
    loading: false,
    error: null,
    users: [],
    room: null
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

const createRoom = (state, action) => {
    return updateObject(state, {
        loading: true,
    })
}

const createRoomSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        room: action.room
    })
}

const createRoomFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_USER: return fetchUser(state, action);
        case actions.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actions.FETCH_USER_FAIL: return fetchUserFail(state, action);
        case actions.CREATE_ROOM: return createRoom(state, action);
        case actions.CREATE_ROOM_SUCCESS: return createRoomSuccess(state, action);
        case actions.CREATE_ROOM_FAIL: return createRoomFail(state, action);
        default: return state;
    }
}

export default reducer;