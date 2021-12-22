import { combineReducers } from 'redux';
import orderReducer from '../views/orderSlice';
import auditReducer from './auditReducer';
import authReducer from './authReducer';
import locatorReducer from './locatorReducer';
import navReducer from './navReducer';

export default combineReducers({
    auth: authReducer,
    orders: orderReducer,
    locator: locatorReducer,
    nav: navReducer,
    audit: auditReducer
});