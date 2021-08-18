import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Lookup from "./Lookup"
import OrderView from "./OrderView";

const QuickView = ( {data} ) => {
    const [orderID, setOrderID] = useState("");
    const [serviceOrder, setServiceOrder] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadServiceOrder = async id => {
        setIsLoading(true);
        setError(null);
        try {
            const resp = await axios.get(
                `/ServiceOrder`,
                { params: { id } }
            );
            setServiceOrder(resp.data);
        } catch (err) {
            const errorResponse = err.response.data.error;
            if (err.response) {
                setError(errorResponse);
            }
            setServiceOrder(null);
        }
        setIsLoading(false);
    }

    if (error && error.status > 400 && error.status < 404) {
        //Log me out
        return <Redirect to={{ pathname: "/login", state: { error } }} />;
    }

    const searchSubmit = (form) => {
        setOrderID(form.id);
        loadServiceOrder(form.id);
    }

    return (
        <div>
            <Lookup handleSubmit={searchSubmit} />
            <OrderView id={orderID} isLoading={isLoading} serviceOrder={serviceOrder} error={error?.message} />
        </div>
    )
}

export default QuickView;