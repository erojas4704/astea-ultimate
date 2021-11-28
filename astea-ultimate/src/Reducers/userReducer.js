import { USER_LOGIN_FAIL, USER_LOGIN_START, USER_LOGIN_SUCCESS } from "../Actions/types";

const DEFAULT_STATE = {
    sessionID: null,
    username: null,
    encryptedSessionID: null,
    accessLevel: null,
    loading: false,
    error: null
}

export default function userReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case USER_LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                sessionID: action.payload.sessionID,
                encryptedSessionID: action.payload.encryptedSessionID,
                accessLevel: action.payload.accessLevel,
                username: action.payload.username
            }
        default:
            return state;
    }
};