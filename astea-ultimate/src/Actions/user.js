import axios from "axios"
import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from "./types";

export function loginUser({ username, password }) {
    return async dispatch => {
        try {
            const resp = await axios.post("/auth/login", { username, password });
            if (resp.success) {
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: resp.data
                });
            } else throw new Error(resp);
        } catch (err) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: err.response.data.message
            });
        }
    }
}