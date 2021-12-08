import axios from "axios";
import { useEffect, useState } from "react";

export default function useSearch(baseCriteria, auto=true) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const execute = async (criteria) => {
        if(!criteria) criteria = baseCriteria; //Default to the criteria we defined at start
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/ServiceOrder/search', { params: criteria }); //TODO make an API class that handles this .
            setData(response.data);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        if (baseCriteria && auto)
            execute(baseCriteria);
    }, []);

    return { loading, error, data, execute }
};