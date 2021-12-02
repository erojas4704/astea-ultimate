import { combineReducers } from 'redux';
import authReducer from './authReducer';
import locatorReducer from './locatorReducer';
import navReducer from './navReducer';
import svReducer from './svReducer';

export default combineReducers({
    auth: authReducer,
    orders: svReducer,
    locator: locatorReducer,
    nav: navReducer
});