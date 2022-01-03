import { Link } from "react-router-dom";
import { parseLink } from "./NavTable";



export default function NavTableRow({ columns, data, selected, onClick }) {
    return (
        <tr
            onClick={() => onClick(data)}
            style={{
                cursor: "pointer",
                backgroundColor: selected ? "#fff1db" : ""
            }}>
            {columns.map((column, i) => {
                const inner = <>{data[column.key]}{column.content}</>;
                const columnClickCallback =
                    column.onClick ? e => { e.stopPropagation(); column.onClick(data) } : null

                return (
                    <td key={i} onClick={columnClickCallback} className={column.className} >
                        {column.route ?
                            <Link to={{ pathname: parseLink(column.route, data) }}>{inner}</Link>
                            : inner}
                    </td>
                )
            })}
        </tr>
    );
}