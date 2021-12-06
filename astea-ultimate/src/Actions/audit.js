import { AUDIT_ADD } from "./types";

export function addToAudit(id, status, location){
    return {
        type: AUDIT_ADD,
        payload: {
            id,
            status,
            location
        }
    }
}