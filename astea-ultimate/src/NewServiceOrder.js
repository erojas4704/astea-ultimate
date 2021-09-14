import { useState } from "react";
import CustomerLookup from "./CustomerLookup";
import "./NewServiceOrder.css";

const NewServiceOrder = () => {
    const [formData, setFormData] = useState({});
    const [customerID, setCustomerID] = useState(null);

    const onChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    }

    console.log(formData);
    return (
        <div className="container">
            {/* Customer / Tranasaction Input */}
            <form className="check-in-form">
                <div className="h3">New Service Order</div>
                <div className="form-row">
                    <div className="form-group ">
                        <label htmlFor="customer">Customer or Transaction Number</label>
                        <input type="text"
                            className="form-control form-control-inline"
                            placeholder="Tulio Kenton"
                            name="customer"
                            id="customer"
                            value={formData.customer}
                            onChange={onChange}
                        />
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" name="newCustomer" id="newCustomer" checked={formData.newCustomer} onChange={onChange} />
                            <label class="form-check-label" htmlFor="newCustomer">
                                New
                            </label>
                        </div>
                        <small id="customerHelp" className="form-text text-muted">{customerID}</small>
                    </div>
                </div>
                {/* Service order details. */}
                {formData.customerID || formData.newCustomer && <>
                    {!formData.newCustomer &&
                        <div className="form-group">
                            <label htmlFor="tag">Tag</label>
                            <input type="text" className="form-control" name="tag" id="tag" placeholder="145-" />
                        </div>
                    }
                    <div className="form-group">
                        <label htmlFor="issue">Issue</label>
                        <textarea type="text" className="form-control" placeholder="Problem Description" name="issue" id="issue" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="condition">Condition (Optional)</label>
                        <textarea type="text" className="form-control" name="condition" id="condition" placeholder="Condition" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" className="form-control" name="phone" id="phone" placeholder="(718) 674-8400" />
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="textOK" />
                            <label class="form-check-label" htmlFor="textOK">
                                Text OK
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" className="form-control" name="password" id="password" placeholder="Computer/OS Password" />
                    </div>
                </>}
            </form>
            {(formData.customer && !formData.customerID) && <CustomerLookup filter={formData.customer} />}
        </div>
    )
}

export default NewServiceOrder;