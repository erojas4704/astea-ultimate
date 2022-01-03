import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { capitalizeNames, nameToInitials } from "../helpers/StringUtils";

export default function OrderListing({ order, onSelect, selected }) {
    const navigate = useNavigate();
    return (
        <tr
            onClick={() => { navigate(`astea/ServiceOrder/${order.id}`); onSelect(order.id) }}
            className={order.isInHistory? 'in-history' : ''}
            style={{ cursor: 'pointer', backgroundColor: selected ? '#fff1db' : '' }}
        >
            <td>
                <Link
                    onClick={() => onSelect(order.id)}
                    to={{ pathname: `/astea/ServiceOrder/${order.id}`, state: { data: order } }}
                >{order.id}
                </Link>
            </td>
            <td>{nameToInitials(order.technician?.name) || ""}</td>
            <td className="col-name">{capitalizeNames(order.customer?.name) || capitalizeNames(order.caller?.name) || capitalizeNames(order.company?.name) || ""}</td>
            <td>{moment(order.openDate).format("MM/DD/yy")}</td>
        </tr>
    )
}