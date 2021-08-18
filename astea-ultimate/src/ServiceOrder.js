import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import Lookup from "./Lookup"
import OrderView from "./OrderView";

const ServiceOrder = (props) => {
    const [orderID, setOrderID] = useState("");
    const [serviceOrder, setServiceOrder] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    console.log(params);

    useEffect(() => {
        if (props.location.state) {
            if (serviceOrder == null || (serviceOrder && serviceOrder.id != props.location.state.data.id)) {
                //TODO workaround until i can figure out how to use params from the router.
                loadServiceOrder(props.location.state.data.id);
            }
            setServiceOrder(props.location.state.data); 
        }
    });

    //console.log("Rendered Service Order", props.location.state);

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

    // const searchSubmit = (form) => {
    //     setOrderID(form.id);
    //     loadServiceOrder(form.id);
    // }

    return (
        <div>
            <OrderView id={orderID} isLoading={isLoading} serviceOrder={serviceOrder} error={error?.message} />
        </div>
    )
}

export default ServiceOrder;