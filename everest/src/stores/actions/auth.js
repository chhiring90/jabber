import * as actionType from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
};