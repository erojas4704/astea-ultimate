import { USER_LOGIN_CANCEL, USER_LOGIN_FAIL, USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_START, USER_LOGOUT_SUCCESS } from "../actions/types";

const DEFAULT_STATE = {
    sessionId: null,
    username: null,
    encryptedSessionId: null,
    accessLevel: null,
    loading: false,
    error: null
}

export default function authReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case USER_LOGIN_START:
            return {
                ...DEFAULT_STATE,
                cancelLogin: action.payload.cancelLogin,
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
                sessionId: action.payload.sessionID,
                encryptedSessionId: action.payload.encryptedSessionID,
                accessLevel: action.payload.accessLevel,
                username: action.payload.username
            }
        case USER_LOGIN_CANCEL:
            return {
                ...state,
                loading: false,
                error: null,
                requestSource: null
            }
        case USER_LOGOUT_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case USER_LOGOUT_SUCCESS:
            return {
                ...DEFAULT_STATE
            }
        case USER_LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};