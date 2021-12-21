import moment from "moment";
import { capitalizeNames, nameToInitials } from "../helpers/StringUtils";
import { FOUND, NOT_FOUND, NOT_RESOLVED } from "../actions/auditTypes";
import LoadingSpinner from "./LoadingSpinner";
import OrderLink from "./OrderLink";
import ClickableInput from "./ClickableInput";


const getColorClass = (order) => {
    if (!order.audit) return "";
    if (order.audit.error) return "table-danger";
    if (order.inHistory === "Y") return "table-warning";
    if (order.statusID === "500" || order.statusID === "700") return "table-info";
    return "table-warning";
}

export default function AuditTableRow({ order }) {

    return (<tr className={getColorClass(order)}>
        <td><OrderLink id={order.id}>{order.id}</OrderLink></td>
        <td>{capitalizeNames(order.customer?.name) || (order.audit?.loading && <LoadingSpinner />)}</td>
        <td>{capitalizeNames(order.technician?.name) || (order.audit?.loading && <LoadingSpinner />)}</td>
        <td><ClickableInput order={order} /></td>
        <td>{moment().diff(order.openDate, "days")}</td>
    </tr>)
}