import axios from "axios";
import { ERROR, NOT_FOUND, NOT_RESOLVED } from "./auditTypes";
import { AUDIT_ADD, AUDIT_NEW, AUDIT_ORDER_LOAD, AUDIT_ORDER_LOAD_FAIL as AUDIT_ORDER_LOAD_FAIL, AUDIT_ORDER_LOAD_SUCCESS as AUDIT_ORDER_LOAD_SUCCESS, AUDIT_RESET, AUDIT_UPDATE } from "./types";
import { getPureId } from "../helpers/ServiceOrderUtils";
import Api from "../api";

export function updateAuditOrder(id, location, status) {

    return {
        type: AUDIT_UPDATE,
        payload: {
            id,
            location,
            status
        }
    }
}

export function createNewAudit(orders) {
    return {
        type: AUDIT_NEW,
        payload: {
            orders
        }
    }
}

export function resetAudit() {
    return {
        type: AUDIT_RESET
    }
}

export function addToAudit(id, location) {
    return async dispatch => {
        dispatch({ type: AUDIT_ADD, payload: { id, location } });
        try {
            dispatch({ type: AUDIT_ORDER_LOAD, payload: { id } });

            const results = await Api.search({ id: getPureId(id) }); //TODO, instead of search, GET. Might not be feasible because of the way some orders are appended with @@ signs.
            //Maybe stick with search so it doesn't matter if we miss the @@1 or not.
            if (results.length > 0)
                dispatch({
                    type: AUDIT_ORDER_LOAD_SUCCESS,
                    payload: {
                        ...results[0],
                        id,
                        audit: { status: NOT_RESOLVED }
                    }
                }); //TODO figure out invoiced status 

            else
                dispatch({
                    type: AUDIT_ORDER_LOAD_FAIL,
                    payload: {
                        id,
                        audit: {
                            location,
                            status: NOT_FOUND,
                            error: "Order not found"
                        }
                    }
                });
        } catch (err) {
            console.log(err);
        }
    }
}