import { useState } from "react";
import { Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import NavTableRow from "./NavTableRow";

export default function NavTable({ columns, data, route }) {
    if (!columns) throw new Error("No column data provided for table");
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null);

    const onRowClick = (row) => {
        setSelectedRow(row);
        if(route){
            navigate(parseLink(route, row))
        }
    }

    return (
        <Table size="sm" responsive hover={route}>
            <thead>
                <tr>
                    {columns.map(column => (
                        <td key={uuid()} style={{ width: column.width }}>{column.label}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data && data.map(row => (
                    <NavTableRow onClick={onRowClick} key={uuid()} data={row} columns={columns} selected={selectedRow === row} />
                ))}
            </tbody>
        </Table>
    )
}
/**
 * Extracts keys from the URL that are surrounded in curly braces and replaces the URL with the value of the keys.
 * @param {string} link 
 * @param {Object} data 
 */
 export function parseLink(link, data){
    let newLink = link;
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            newLink = newLink.replace(`{${key}}`, value);
        }
    }
    return newLink;
}