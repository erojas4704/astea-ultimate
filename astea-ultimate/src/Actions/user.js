import Api from "../api";
import { USER_LOGIN_FAIL, USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_START, USER_LOGOUT_SUCCESS, USER_LOGIN_CANCEL } from "./types";

export function loginUser({ username, password }) {
    return async dispatch => {
        try {
            const { promise, cancel } = Api.req(Api.login, username, password);
            dispatch({ type: USER_LOGIN_START, payload: { cancel } });
            const data = await promise;

            console.log(promise);
            console.log(data);

            if (data.sessionId) {
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: data
                });
            } else throw new Error(data);
        } catch (err) {
            console.error(err);
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: err.message //TODO more standardized error messages that aren't A$$.
            });
        }
    }
}

export function validateAuth() {
    return async (dispatch) => {
        try {
            const success = await Api.validateSession();
            if (!success) dispatch(logoutUser());
        } catch (err) {
            console.log(err);
        }
    }
}

export function cancelLogin() {
    return async (dispatch, getState) => {
        const cancel = getState().auth.cancel;
        if (cancel) cancel();
        dispatch({ type: USER_LOGIN_CANCEL });
    }
}

export function logoutUser() {
    return async dispatch => {
        try {
            dispatch({ type: USER_LOGOUT_START });
            const success = Api.logout();
            if (success) dispatch({ type: USER_LOGOUT_SUCCESS });
        } catch (err) {
            dispatch({ type: USER_LOGOUT_FAIL, payload: err.response.data.message });
        }
    }
}