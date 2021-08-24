import axios from "axios";
import { useEffect, useRef } from "react";
import useAsync from "./useAsync";

const useServiceOrder = (id, props) => {
    console.log("Service order hooks called", id);
    let cancelTokenSource = useRef();

    const { execute, response, error, loading } = useAsync(
        () => {
            console.log(`Loading service order ${id}`, shouldLoadServiceOrder(serviceOrder, id));
            cancelTokenSource.current = axios.CancelToken.source();
            if(shouldLoadServiceOrder(serviceOrder, id))
                return axios.get('/ServiceOrder', { params: { id }, cancelToken: cancelTokenSource.current.token });
        }
    );

    const serviceOrder = response? response.data: getServiceOrderFromProps(props);

    useEffect(() => {
        execute();
        return () => {
            cancelTokenSource.current.cancel();
        }
    }, [id]);
    return { serviceOrder, isLoading: loading, error };
}

const shouldLoadServiceOrder = (serviceOrder, id) => {
    return !serviceOrder || serviceOrder.id !== id || serviceOrder.completeness < 3;
}

const getServiceOrderFromProps = props => {
    if (props.location && props.location.state) {
        return props.location.state.data;
    } else {
        return;
    }
}

export { useServiceOrder };