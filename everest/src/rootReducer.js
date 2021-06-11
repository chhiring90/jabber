import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './stores/reducers/auth';
import chatReducer from './stores/reducers/chats';
import messageReducer from './stores/reducers/message';
import socketReducer from './stores/reducers/socket';

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    message: messageReducer,
    socket: socketReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;