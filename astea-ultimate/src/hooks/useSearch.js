import axios from "axios";
import { useEffect, useState } from "react";
import Api from "../api";

export default function useSearch(baseCriteria, auto=true) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState({});

    const execute = async (criteria) => {
        if(!criteria) criteria = baseCriteria; //Default to the criteria we defined at start
        setLoading(true);
        setError(null);
        try {
            const response = await Api.search(criteria, false); //TODO make an API class that handles this .
            setData(response.data.results);
            setMeta(response.data.meta);
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