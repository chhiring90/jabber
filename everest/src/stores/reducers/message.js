import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utilty';

const initialState = {
    messages: [],
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        // case actionTypes.
        default: return state;
    }
}

export default reducer;