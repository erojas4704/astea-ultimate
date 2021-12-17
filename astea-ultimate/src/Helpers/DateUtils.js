import moment from "moment";

export const sameDay = (a, b) => {
    if (moment(a).isSame(b, 'day'))
        return true;
    return false;
}
