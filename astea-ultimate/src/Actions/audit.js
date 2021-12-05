import { AUDIT_ADD } from "./types";

export function addToAudit(order, location){
    return {
        type: AUDIT_ADD,
        payload: {
            id: order.id,
            order,
            location
        }
    }
}