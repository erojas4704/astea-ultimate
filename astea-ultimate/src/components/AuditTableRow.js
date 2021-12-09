import moment from "moment";
import { capitalizeNames } from "../helpers/StringUtils";
import { FOUND, NOT_FOUND, NOT_RESOLVED } from "../actions/auditTypes";
import LoadingSpinner from "./LoadingSpinner";

const colors = {
    [FOUND]: "table-info",
    [NOT_FOUND]: "table-danger",
    [NOT_RESOLVED]: "table-warning"
}

const getColorClass = (order) => {
    if(!order.audit) return "";
    if(order.inHistory === "Y") return "table-danger";
    if(order.statusID === "500" || order.statusID === "700") return "table-info";
    return "table-warning";
}

export default function AuditTableRow({order}) {
    const statusColor = colors[order.audit?.status] || "";

    return (<tr className={getColorClass(order)}>
        <td>{order.id}</td>
        <td>{capitalizeNames(order.customer?.name) || (order.audit?.loading && <LoadingSpinner />)}</td>
        <td>{capitalizeNames(order.technician?.name) || (order.audit?.loading && <LoadingSpinner />)}</td>
        <td>{order.audit?.location}</td>
        <td>{moment().diff(order.openDate, "days")}</td>
    </tr>)
}