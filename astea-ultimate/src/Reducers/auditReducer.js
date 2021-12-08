import { AUDIT_ADD, AUDIT_NEW, AUDIT_ORDER_LOAD, AUDIT_ORDER_LOAD_FAIL, AUDIT_ORDER_LOAD_SUCCESS, AUDIT_RESET, AUDIT_UPDATE } from "../actions/types";
import { findOrderById, orderIdsMatch } from "../helpers/ServiceOrderUtils";

const DEFAULT_STATE = {
    name: '',
    loading: false,
    date: null,
    error: null,
    orders: []
}

const getLocalOrder = (ordersArr, id) => ordersArr.find(findOrderById(id));


export default function auditReducer(state = DEFAULT_STATE, action) {
    //TODO audits can be saved and loaded locally for now. With a database this would be a good idea.
    switch (action.type) {
        case AUDIT_NEW:
            return {
                ...state,
                loading: false,
                error: null,
                date: new Date(),
                orders: action.payload.orders
            }
        case AUDIT_ADD:
            //Add to beginning of audit, making sure that the order is not already in the audit
            return {
                ...state,
                orders: [action.payload, ...state.orders.filter(order => !orderIdsMatch(order.id, action.payload.id))]
            }
        case AUDIT_UPDATE:
            const localIndex = state.orders.findIndex(findOrderById(action.payload.id));
            const updatedOrder = localIndex >= 0 ? state.orders[localIndex] : action.payload;
            updatedOrder.audit = action.payload;

            return {
                ...state,
                orders: [
                    updatedOrder,
                    ...state.orders.filter(order => order.id !== updatedOrder.id)
                ]
            }
        case AUDIT_RESET:
            return DEFAULT_STATE;
        case AUDIT_ORDER_LOAD:
            {
                const orders = [...state.orders];
                const index = orders.findIndex(findOrderById(action.payload.id));
                orders[index] = {
                    ...orders[index],
                    audit: {
                        ...action.payload,
                        loading: true
                    }
                };

                return {
                    ...state,
                    orders
                }
            }
        case AUDIT_ORDER_LOAD_FAIL:
            {
                const orders = [...state.orders];
                const index = orders.findIndex(findOrderById(action.payload.id));
                orders[index] = {
                    ...orders[index],
                    audit: {
                        ...orders[index].audit,
                        ...action.payload.audit,
                        loading: false
                    }
                };

                return {
                    ...state,
                    orders
                }
            }

        //TODO cross-intergation with the order reducer instead of loading them here.
        case AUDIT_ORDER_LOAD_SUCCESS:
            {
                const orders = [...state.orders];
                //const index = orders.findIndex((a) => a.id.toUpperCase().trim().includes(action.payload.id.toUpperCase().trim()))
                const index = orders.findIndex(findOrderById(action.payload.id));
                console.log(index);
                orders[index] = {
                    ...orders[index],
                    ...action.payload,
                    audit: {
                        ...orders[index].audit,
                        ...action.payload.audit,
                        loading: false
                    }
                };

                console.log({ ...state, orders });
                return {
                    ...state,
                    orders
                }
            }
        default:
            return state;
    }
}