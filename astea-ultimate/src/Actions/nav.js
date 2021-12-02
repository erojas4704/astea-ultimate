import { SET_MODULE } from "./types";

export function setModule(module) {
    return {
        type: SET_MODULE,
        payload: {
            module
        }
    };
}