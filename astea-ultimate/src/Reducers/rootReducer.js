import { combineReducers } from 'redux';
import orderReducer from '../views/orderSlice';
import auditReducer from './auditReducer';
import authReducer from './authReducer';
import locatorReducer from './locatorSlice';
import navReducer from './navReducer';
import materialReducer from './materialSlice';

export default combineReducers({
    auth: authReducer,
    orders: orderReducer,
    materials: materialReducer,
    locator: locatorReducer,
    nav: navReducer,
    audit: auditReducer
});