import { useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function NavTable({ columns, data, route }) {
    if (!columns) throw new Error("No column data provided for table");
    const [selectedRow, setSelectedRow] = useState(null);

    const onRowClick = (e) => {
        console.log("Row Clicked", e.target.dataset.id);
        const row = e.target.closest("tr");
        if (row) {
            const id = row.dataset.id;
            setSelectedRow(id);
        }
    }

    return (
        <Table size="sm" responsive hover>
            <thead>
                <tr>
                    {columns.map(column => (
                        <td key={uuid()} style={{ width: column.width }}>{column.label}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data && data.map(row => (
                    <tr key={uuid()} onClick={onRowClick} style={{ cursor: "pointer" }}>
                        {columns.map((column, i) => (
                            column.link ?
                                <td key={i}><Link to={{ pathname: `${route}/${row[column.key]}` }}>{row[column.key]}</Link></td>
                                : <td key={i}>{row[column.key]}</td>
                        ))}
                    </tr>)
                )}
            </tbody>
        </Table>
    )
}