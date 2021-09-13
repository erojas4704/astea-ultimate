import "./NewServiceOrder.css";

const NewServiceOrder = () => {
    return (
        <div>
            <form className="check-in-form">
                <div className="form-group">
                    <label htmlFor="customer">Customer</label>
                    <input type="text" className="form-control" placeholder="Customer Name" name="customer" id="customer" />
                    <small id="customerHelp" className="form-text text-muted">CUST541411341563</small>
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" name="tag" id="tag" placeholder="145-" />
                </div>
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
                        <input class="form-check-input" type="checkbox" id="textOK"/>
                        <label class ="form-check-label" htmlFor="textOK">
                        Text OK
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" className="form-control" name="password" id="password" placeholder="Computer/OS Password" />
                </div>
            </form>
        </div>
    )
}

export default NewServiceOrder;