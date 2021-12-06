import { AUDIT_ADD } from "../actions/types";

const DEFAULT_STATE = {
    index: 0,
    date: '',
    orders: {}
}

export default function auditReducer(state = DEFAULT_STATE, action) {
    //TODO missing save functionality and load
    switch (action.type) {
        case AUDIT_ADD:
            return {
                ...state,
                index: state.index + 1,
                orders: {
                    ...state.orders,
                    [action.payload.id]: {
                        ...action.payload,
                        index: state.index
                    }
                }
            }
        default:
            return state;
    }
}