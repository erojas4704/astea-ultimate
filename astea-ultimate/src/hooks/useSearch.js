import axios from "axios";
import { useEffect, useState } from "react";
import Api from "../api";

export default function useSearch(baseCriteria, auto=true) {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState({});
    const [status, setStatus] = useState("idle");

    const execute = async (criteria) => {
        if(!criteria) criteria = baseCriteria; //Default to the criteria we defined at start
        setError(null);
        setStatus("pending");
        try {
            const response = await Api.search(criteria, false, 10); //TODO make an API class that handles this .
            setData(response.results);
            setMeta(response.meta);
            setStatus("fulfilled");
        } catch (err) {
            console.error(err);
            setError(err);
            setStatus("error");
        }
    };

    useEffect(() => {
        if (baseCriteria && auto && status === "idle")
            execute(baseCriteria);
    }, []);

    return { status, error, data, execute }
};