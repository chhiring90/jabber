import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilty';

const initialState = {
    loading: false,
    error: null,
    users: [],
    activeChat: {
        user: null,
        room: null
    }
}

const fetchUser = (state, action) => {
    return updateObject(state, {
        loading: action.loading
    });
};

const fetchUserSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        users: action.data
    });
};

const fetchUserFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const createRoom = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
};

const createRoomSuccess = (state, action) => {
    let activeUser = state.users.filter(user => user.slug === action.slug)[0];
    return updateObject(state, {
        loading: false,
        activeChat: {
            user:activeUser,
            room: action.room
        }
    });
};

const createRoomFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const joinedServer = (state, action) => {
    return updateObject(state, {
        loading: action.loading
    });
};

const joinedServerSuccess = (state, action) => {
    let updatedUser = [...state.users].map(user => {
        if (user._id === action.userId) {
            console.log(user.name, 'Joined Server Successfully [JOINEDSERVERSUCCESS]');
            user.active = true;
        }
        return user;
    });

    return updateObject(state, {
        users: updatedUser,
        loading: action.loading,
    });
};

const joinedServerFail = (state, action) => {
    return updateObject(state, {
        loading: action.loading,
        error: action.error
    })
};

const disconnectServer = (state, action) => {
    const updatedUser = [...state.users].map(user => {
        if(user._id === action.userId){
            user.active = false;
        }
        return user;
    });

    return updateObject(state, {
        users: updatedUser,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER: return fetchUser(state, action);
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);
        case actionTypes.SOCKET_JOINED_SERVER: return joinedServer(state, action);
        case actionTypes.SOCKET_JOINED_SUCCESS: return joinedServerSuccess(state, action);
        case actionTypes.SOCKET_JOINED_FAIL: return joinedServerFail(state, action);
        case actionTypes.CREATE_ROOM: return createRoom(state, action);
        case actionTypes.CREATE_ROOM_SUCCESS: return createRoomSuccess(state, action);
        case actionTypes.CREATE_ROOM_FAIL: return createRoomFail(state, action);
        case actionTypes.SOCKET_DISCONNECT_SERVER: return disconnectServer(state, action);
        default: return state;
    }
}

export default reducer;