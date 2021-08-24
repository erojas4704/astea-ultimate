//TODO Sometimes orders overwrite the wrong order in localStorage. This is really bad.
import axios from "axios";
import { useEffect, useRef } from "react";
import useAsync from "./useAsync";

const useServiceOrder = (id, props) => {
    let cancelTokenSource = useRef();
    const local = localStorage.getItem(`serviceOrder-${id}`) ? JSON.parse(localStorage.getItem(`serviceOrder-${id}`)) : null;

    const { execute, response, error, loading } = useAsync(
        () => {
            console.log(`Loading service order ${id}`, shouldLoadServiceOrder(serviceOrder, id, local));
            cancelTokenSource.current = axios.CancelToken.source();
            if (shouldLoadServiceOrder(serviceOrder, id, local))
                return axios.get('/ServiceOrder', { params: { id }, cancelToken: cancelTokenSource.current.token });
            else return new Promise((r, x) => r()); //TODO ugly hack. Fix it.
        }
    );

    const serviceOrder = response ? response.data : getLocalServiceOrder(local, props, id);
    if (response) {
        localStorage.setItem(`serviceOrder-${id}`, JSON.stringify(response.data));
    }


    useEffect(() => {
        console.log(`Local service order ${id}`, local);
        execute();
        return () => {
            cancelTokenSource.current.cancel();
        }
    }, [id]);
    return { serviceOrder, isLoading: loading, error };
}

const useInteractions = (serviceOrder) => {
    const { id } = serviceOrder;
    let cancelTokenSource = useRef();

    const { execute, response, error, loading } = useAsync(
        () => {
            cancelTokenSource.current = axios.CancelToken.source();
            if (shouldLoadInteractions(serviceOrder))
                return axios.get('/ServiceOrder/interactions', { params: { id }, cancelToken: cancelTokenSource.current.token });
            else return new Promise((r, x) => r()); //TODO ugly hack. Fix it.
        }
    );

    const interactions = response ? response.data : serviceOrder.interactions;

    useEffect(() => {
        execute();
        return () => {
            cancelTokenSource.current.cancel();
        }
    }, [serviceOrder]);

    return { interactions, loading, error };
}

const shouldLoadInteractions = (serviceOrder) => {
    return !serviceOrder.interactions || serviceOrder.completeness < 2 || serviceOrder.interactions == 0; //TODO force an update after a certain age
}

const shouldLoadServiceOrder = (serviceOrder, id, local) => {
    debugger
    if (local && local.completeness > 1 && local.id === id) return false; //TODO force an update after a certain age
    return !serviceOrder || serviceOrder.id !== id || serviceOrder.completeness < 3;
}

const getLocalServiceOrder = (local, props, id) => {
    if (local && local.id === id && local.completeness > 1) return local; //TODO make sure the local one isn't outdated.
    if (props.location && props.location.state) {
        return props.location.state.data;
    } else {
        return;
    }
}

export { useServiceOrder, useInteractions };