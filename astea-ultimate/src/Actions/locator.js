import axios from "axios";
import { LOCATOR_SEARCH, LOCATOR_SEARCH_FAIL, LOCATOR_SEARCH_RESET, LOCATOR_SEARCH_SUCCESS } from "./types";

export function resetSearch() {
    return { type: LOCATOR_SEARCH_RESET };
}

export function search(term, includeHistory) {
    let params;
    if (typeof term === "string") {
        params = {
            all: term,
            includeHistory,
            actionGroup: "QNTech" //TODO get from user or even better settings
        }
    }else if(typeof term === "object"){
        params = {
            ...term,
            includeHistory,
            actionGroup: "QNTech" //TODO get from user or even better settings
        }
    }

    return async dispatch => {
        dispatch({
            type: LOCATOR_SEARCH,
            payload: params
        });
        try {
            const resp = await axios.get('/ServiceOrder/search', { params });
            dispatch({
                type: LOCATOR_SEARCH_SUCCESS,
                payload: resp.data
            })
        } catch (err) {
            console.log(err);
            dispatch({ type: LOCATOR_SEARCH_FAIL, payload: err.message });
        }
    }
}