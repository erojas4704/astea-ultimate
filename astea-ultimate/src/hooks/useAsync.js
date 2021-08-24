import { useCallback, useState } from "react";

const useAsync = (callback) => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const execute = useCallback(() => {
        setLoading(true);
        setResponse(null);
        setError(null);

        return callback()
            .then(resp => {
                setResponse(resp);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [callback]);

    return { execute, response, error, loading };
}

export default useAsync;