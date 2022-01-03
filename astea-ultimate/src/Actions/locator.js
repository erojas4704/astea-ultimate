import Api from "../api";
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
    } else if (typeof term === "object") {
        params = {
            ...term,
            includeHistory,
            actionGroup: "QNTech" //TODO get from user or even better settings
        }
    }
    
    if (params.includeHistory === "") delete params.includeHistory;
    else params.includeHistory = includeHistory === "Y";


    return async dispatch => {
        dispatch({
            type: LOCATOR_SEARCH,
            payload: params
        });
        try {
            const results = await Api.search(params);
            dispatch({
                type: LOCATOR_SEARCH_SUCCESS,
                payload: results
            })
        } catch (err) {
            console.log(err);
            dispatch({ type: LOCATOR_SEARCH_FAIL, payload: err.message });
        }
    }
}