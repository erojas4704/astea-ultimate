import { combineReducers } from 'redux';
import authReducer from './authReducer';
import locatorReducer from './locatorReducer';
import svReducer from './svReducer';

export default combineReducers({
    auth: authReducer,
    orders: svReducer,
    locator: locatorReducer
});