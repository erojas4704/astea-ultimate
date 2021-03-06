//TODO Sometimes orders overwrite the wrong order in localStorage. This is really bad.
import { useEffect, useRef } from "react";
import useAsync from "./useAsync";
import { getAgeInMinutes } from "../helpers/ServiceOrderUtils";
import Api from "../api";
import axios from "axios";

const useServiceOrder = (id, props) => {
    let cancelRef = useRef();
    let localCancelRef = useRef();
    const local = localStorage.getItem(`serviceOrder-${id}`) ? JSON.parse(localStorage.getItem(`serviceOrder-${id}`)) : null;

    const { execute, response, error, loading } = useAsync(
        () => {
            const { promise, cancel } = Api.req(Api.getServiceOrder, id);

            cancelRef.current = cancel;
            if (shouldLoadServiceOrder(serviceOrder, id, local))
                return promise;
            else return Promise.resolve(); //Returns empty promise if we shouldn't load a service order //TODO ugly hack. Fix it.
        }
    );

    const { execute: loadCached, response: cachedResponse, error: cachedError, loading: cachedLoading } = useAsync(
        () => {
            const { promise, cancel } = Api.req(Api.getServiceOrder, id, true);
            localCancelRef.current = cancel;
            return promise;
        }
    );

    //TODO consider why is this out here? This makes no sense to me. This may be getting called every render.
    let serviceOrder = response ? response : getLocalServiceOrder(local, props, id);
    if (response) {
        response.cachedAt = new Date();
        localStorage.setItem(`serviceOrder-${id}`, JSON.stringify(response)); //TODO make service order model and update it there.
    }


    useEffect(() => {
        console.log(`Local service order ${id}`, local);
        if (id !== serviceOrder?.id) serviceOrder = null;
        loadCached();
        execute();
        return () => {
            //On dismount, cancel loading the SV
            cancelRef.current();
            localCancelRef.current();
        }
    }, [id]);
    return { serviceOrder: (serviceOrder || cachedResponse), isLoading: (loading || cachedLoading), error };
}

const useInteractions = (serviceOrder) => {
    const { id } = serviceOrder;
    let cancelTokenSource = useRef();
    let interactions;

    const { execute, response, error, loading } = useAsync(
        () => {
            cancelTokenSource.current = axios.CancelToken.source();
            if (shouldLoadInteractions(serviceOrder))
                return axios.get('/ServiceOrder/interactions', { params: { id }, cancelToken: cancelTokenSource.current.token });
            else return new Promise((r, x) => r()); //TODO ugly hack. Fix it.
        }
    );

    interactions = response ? response.data : serviceOrder.interactions;

    if (response) {
        serviceOrder.interactions = response.data;
        localStorage.setItem(`serviceOrder-${id}`, JSON.stringify(serviceOrder)); //TODO make service order model and update it there.
    }

    useEffect(() => {
        execute();
        return () => {
            cancelTokenSource.current.cancel();
        }
    }, [serviceOrder]);

    return { interactions, loading, error };
}

const useMaterials = (serviceOrder) => {
    const { id } = serviceOrder;
    let cancelTokenSource = useRef();
    let materials;

    const { execute, response, error, loading } = useAsync(
        () => {
            cancelTokenSource.current = axios.CancelToken.source();
            if (shouldLoadMaterials(serviceOrder))
                return axios.get('/ServiceOrder/materials', { params: { id }, cancelToken: cancelTokenSource.current.token });

            else return new Promise((r, x) => r()); //TODO ugly hack. Fix it.
        }
    );

    materials = response ? response.data : serviceOrder.materials;

    if (response) {
        serviceOrder.materials = response.data;
        localStorage.setItem(`serviceOrder-${id}`, JSON.stringify(serviceOrder)); //TODO make service order model and update it there.
    }

    useEffect(() => {
        execute();
        return () => {
            cancelTokenSource.current.cancel();
        }
    }, [serviceOrder]);

    return { materials, loading, error };
}

const shouldLoadMaterials = (serviceOrder) => {
    if (!serviceOrder.materials) return true;
}

const shouldLoadInteractions = (serviceOrder) => {
    return (!serviceOrder.interactions || serviceOrder.interactions == 0) && serviceOrder.completeness == 2; //TODO force an update after a certain age
}

const shouldLoadServiceOrder = (serviceOrder, id, local) => {
    if (local && getAgeInMinutes(local) > 5) console.log(`Service order ${id} is old. Getting new ${getAgeInMinutes(local)}`);
    if (!local) console.log(`Service order does not exist. Getting new`);
    if (local && local.completeness < 2) console.log(`Service order ${id} is incomplete. Getting new`);

    if (local && local.completeness > 1 && local.id === id && getAgeInMinutes(local) < 5) return false; //TODO force an update after a certain age defined by environment
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

export { useServiceOrder, useInteractions, useMaterials };