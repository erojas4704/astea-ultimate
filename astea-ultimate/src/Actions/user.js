import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_START, USER_LOGOUT_SUCCESS, USER_LOGIN_CANCEL } from "./types";

export function loginUser({ username, password }) {
    //TODO user can get stuck in the login hook if they navigate away from the page.
    return async dispatch => {
        try {
            const cancelToken = axios.CancelToken;
            const source = cancelToken.source();
            dispatch({ type: USER_LOGIN_START, payload: { requestSource: source } });
            const resp = await axios.post("/auth/login", { username, password }, { cancelToken: source.token });
            if (resp.data.success) {
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: resp.data
                });
            } else throw new Error(resp);
        } catch (err) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: err.response.data.error.message //TODO more standardized error messages that aren't A$$.
            });
        }
    }
}

export function cancelLogin() {
    return async (dispatch, getState) => {
        const source = getState().auth.requestSource;
        if (source) {
            source.cancel();
        }
        dispatch({ type: USER_LOGIN_CANCEL });
    }
}

export function logoutUser() {
    return async dispatch => {
        try {
            dispatch({ type: USER_LOGOUT_START });
            const resp = await axios.post("/auth/logout");
            if (resp.data.success) dispatch({ type: USER_LOGOUT_SUCCESS });
        } catch (err) {
            dispatch({ type: USER_LOGOUT_FAIL, payload: err.response.data.message });
        }
    }
}