import { LOCATOR_SEARCH, LOCATOR_SEARCH_FAIL, LOCATOR_SEARCH_RESET, LOCATOR_SEARCH_SUCCESS } from "../actions/types";
import _ from "lodash";

const INITIAL_STATE = {
    criteria: "",
    loading: false,
    orders: {},
    data: [],
    cache: {},
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
        case LOCATOR_SEARCH_RESET:
            return {
                ...state,
                error: null,
                loading: false,
                criteria: {}
            }
        case LOCATOR_SEARCH:
            return {
                ...state,
                data: [],
                criteria: action.payload,
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
                cache: { ...state.cache, [JSON.stringify(state.criteria)]: action.payload }, //TODO only cache the last x amount of searches or maybe have them expire
                orders: { ...state.orders, ...mapOrders(action.payload) }
            }
        default:
            return state;
    }
}