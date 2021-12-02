import { SET_MODULE } from "../actions/types";

const DEFAULT_STATE = {
    module: "",
    expanded: false
}

export default function navReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_MODULE:
            return {
                ...state,
                module: action.payload.module
            }
        default:
            return state;
    }
}