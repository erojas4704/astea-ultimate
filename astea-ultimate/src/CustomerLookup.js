import { capitalizeNames } from "./helpers/StringUtils";
import { v4 as uuid } from "uuid";
import { Alert, Table } from "react-bootstrap";

const CustomerLookup = ({ filter, data }) => {
    const customers = data ? data.filter(customer => customer.name.toLowerCase().includes(filter.toLowerCase())) : [];
    console.log("customers: ", customers?.length || "0", "data:", data?.length || "0");
    //debugger;
    
    if(data?.length === 0){
        return <Alert variant={'info'}>No customers found under given criteria.</Alert>;
    }

    return (
        <div>
            <>{data && <>{data.length}</>}</>
            {data && data.length >= 599 && <div className="error">More than 700 results. Try narrowing your search.</div>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Node</th>
                        <th>State</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(
                        customer => (
                            <tr key={uuid()}>
                                <td>{customer.id}</td>
                                <td>{capitalizeNames(customer.name)}</td>
                                <td>{customer.node}</td>
                                <td>{customer.state}</td>
                                <td>{customer.city}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default CustomerLookup;