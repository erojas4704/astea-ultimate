import { capitalizeNames } from "./Helpers/StringUtils";

const CustomerLookup = ({ filter, data }) => {
    const customers = data ? data.filter(customer => customer.name.toLowerCase().includes(filter.toLowerCase())) : [];
    console.log("customers: ", customers?.length || "0", "data:", data?.length || "0");
    //debugger;
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Node</th>
                        <th>Customer Name</th>
                        <th>State</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(
                        customer => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.node}</td>
                                <td>{capitalizeNames(customer.name)}</td>
                                <td>{customer.state}</td>
                                <td>{customer.city}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerLookup;