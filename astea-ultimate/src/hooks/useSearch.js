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
            console.log("Search ran");
            const response = await axios.get('/ServiceOrder/search', { params: criteria }); //TODO make an API class that handles this .
            setData(response.data);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        if (criteria)
            execute(criteria);
    }, []);

    return { loading, error, data, execute }
};