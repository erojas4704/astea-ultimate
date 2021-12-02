import { LOCATOR_SEARCH, LOCATOR_SEARCH_FAIL, LOCATOR_SEARCH_SUCCESS } from "../actions/types";

const INITIAL_STATE = {
    term: "",
    loading: false,
    orders: {},
    data: [],
    error: null
}

const mapOrders = orders => {
    const newOrders = {};
    orders.forEach(order => {
        newOrders[order.id] = order;
    });
    return newOrders;
}

/** Locator stores the details and results of the current search. */
export default function locatorReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOCATOR_SEARCH:
            return {
                ...state,
                data: [],
                loading: true,
                error: null
            }
        case LOCATOR_SEARCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case LOCATOR_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                orders: { ...state.orders, ...mapOrders(action.payload) }
            }
        default:
            return state;
    }
}