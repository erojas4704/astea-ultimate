import { AUDIT_ADD } from "../actions/types";

const DEFAULT_STATE = {
    date: '',
    orders: {}
}

export default function auditReducer(state = DEFAULT_STATE, action) {
    //TODO missing save functionality and load
    switch (action.type) {
        case AUDIT_ADD:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    [action.payload.id]: action.payload
                }
            }
        default:
            return state;
    }
}