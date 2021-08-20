import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import OrderView from "./OrderView";

const shouldLoadServiceOrder = (currentID, props, orderID, localOrder) => {
    if(localOrder && localOrder.completeness > 2 && new Date() - new Date(localOrder.retrievedAt) < 300000) return false;

    if (props.location.state && props.location.state.data) {
        const data = props.location.state.data;
        if( data.id !== currentID || data.completeness < 3) return true;
        return false;
    }
    return true;
}

const ServiceOrder = (props) => {
    const [orderID, setOrderID] = useState("");
    const [serviceOrder, setServiceOrder] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();

    //setOrderID(props.location.state.data.id);

    useEffect(() => {
        const id = params.id;
        if(props.location?.state?.data) setServiceOrder(props.location.state.data); //Set data from history. This will most likely be incomplete.

        let localString = localStorage.getItem(`serviceOrder-${id}`);
        let local = localString ? JSON.parse(localString) : undefined;
        if(local) setServiceOrder(local);
        
        let forceLoad = shouldLoadServiceOrder(orderID, props, params.id, local);
        setOrderID(id);

        
        if(forceLoad) {
            loadServiceOrder(params.id);
        }
    }, [params]);

    //console.log("Rendered Service Order", props.location.state);

    const loadServiceOrder = async id => {
        setIsLoading(true);
        setError(null);
        try {
            const resp = await axios.get(
                `/ServiceOrder`,
                { params: { id } }
            );
            resp.data.retrievedAt = new Date();
            localStorage.setItem(`serviceOrder-${id}`, JSON.stringify(resp.data));
            setServiceOrder(resp.data);
        } catch (err) {
            const errorResponse = err.response.data.error;
            if (err.response) setError(errorResponse);
            setServiceOrder(null);
        }
        setIsLoading(false);
    }

    if (error && error.status > 400 && error.status < 404) {
        //Log me out
        return <Redirect to={{ pathname: "/login", state: { error } }} />;
    }

    return (
        <div>
            <OrderView id={orderID} isLoading={isLoading} serviceOrder={serviceOrder} error={error?.message} />
        </div>
    )
}

export default ServiceOrder;