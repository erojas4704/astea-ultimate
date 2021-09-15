import useCustomerSearch from "./hooks/useCustomerSearch";

const CustomerLookup = ({ filter, customerData }) => {
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
                </tbody>
            </table>
        </div>
    );
}

export default CustomerLookup;