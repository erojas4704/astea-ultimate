import { useState } from "react";
import CustomerLookup from "./CustomerLookup";
import useCustomerSearch from "./hooks/useCustomerSearch";
import "./NewServiceOrder.css";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewServiceOrder = () => {
    const [formData, setFormData] = useState({
        customerId: "",
        customer: ""
    });
    const [customerID, setCustomerID] = useState(null);
    const { execute, loading, response, error } = useCustomerSearch({ name: formData.customer }); //TODO rename some vars
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const onChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    }

    const onCustomerName = (e) => {
        const value = e.target.value;
        //On change of customer name, wait a second, then search. 
        if (searchTimeout) {
            clearTimeout(searchTimeout);
            setSearchTimeout(null);
        }

        if (shouldSearch(searchTerm, value, response?.data)) {
            setSearchTimeout(setTimeout(() => {
                setSearchTerm(value);
                execute({ name: value });
            }, 1000));
        }
    }

    const formSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="container new-service-order">
            {/* Customer / Tranasaction Input */}
            <form className="check-in-form" onSubmit={formSubmit}>
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
                            onChange={(e) => { onChange(e); onCustomerName(e) }}
                        />
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="newCustomer" id="newCustomer" checked={formData.newCustomer} onChange={onChange} />
                            <label className="form-check-label" htmlFor="newCustomer">
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
            {loading && <FontAwesomeIcon className="fa-spin sv-spinner center" icon={faCircleNotch} />}
            {(formData.customer && !formData.customerID) && <CustomerLookup filter={formData.customer} data={response?.data} />}
        </div>
    )
}

const shouldSearch = (currentSearch, newValue, searchData) => {
    if (currentSearch.length < 1) return true;

    console.log(`Should search ${currentSearch} -> ${newValue}? \n 
        Are searches not the same? ${currentSearch !== newValue} \n 
        Does the new search include the original search? ${newValue.includes(currentSearch)}
        Does the original search include the new search? ${currentSearch.includes(newValue)}
        returning ${
            currentSearch !== newValue && //Make sure the searches are different
            (!newValue.includes(currentSearch) && searchData?.length < 700)  //If the new search is not a subset of the old search, and the search data is over 700, then search.
            || !currentSearch.includes(newValue)
        }
    `);


    return currentSearch !== newValue && //Make sure the searches are different
        (!newValue.includes(currentSearch) && searchData?.length < 700)  //If the new search is not a subset of the old search, and the search data is over 700, then search.
        || !currentSearch.includes(newValue); //If the current search does not the new value, we will search.
}

export default NewServiceOrder;