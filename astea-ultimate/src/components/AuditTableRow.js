import moment from "moment";
import { capitalizeNames } from "../helpers/StringUtils";
import { FOUND, NOT_FOUND, NOT_RESOLVED } from "../actions/auditTypes";

const colors = {
    [FOUND]: "table-info",
    [NOT_FOUND]: "table-danger",
    [NOT_RESOLVED]: "table-warning"
}

export default function AuditTableRow({order}) {
    const statusColor = colors[order.audit?.status] || "";

    return (<tr className={statusColor}>
        <td>{order.id}</td>
        <td>{capitalizeNames(order.customer?.name)}</td>
        <td>{capitalizeNames(order.technician?.name)}</td>
        <td>{order.audit?.location}</td>
        <td>{moment().diff(order.openDate, "days")}</td>
    </tr>)
}