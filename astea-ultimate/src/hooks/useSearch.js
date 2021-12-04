import axios from "axios";
import { useEffect, useState } from "react";

export default function useSearch(criteria) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const execute = async (criteria) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/ServiceOrder/search', { params: criteria }); //TODO make an API class that handles this .
            console.log("GETEGETET");
            setData(response.data);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        if (criteria)
            execute(criteria);
    }, [execute]);

    return { loading, error, data, execute }
};