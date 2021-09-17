import useCustomerSearch from "./hooks/useCustomerSearch";

const CustomerLookup = ({ filter, data }) => {
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Customer Address</th>
                        <th>Customer ID</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(customer => <tr key={customer.id}><td>{customer.name}</td></tr>) }
                </tbody>
            </table>
        </div>
    );
}

export default CustomerLookup;