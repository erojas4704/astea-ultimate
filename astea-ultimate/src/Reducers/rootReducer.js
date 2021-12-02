import { combineReducers } from 'redux';
import authReducer from './authReducer';
import locatorReducer from './locatorReducer';
import navReducer from './navReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    auth: authReducer,
    orders: orderReducer,
    locator: locatorReducer,
    nav: navReducer
});