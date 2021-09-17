import axios from "axios"
import useAsync from "./useAsync"

const useCustomerSearch = (params) => {
    const { execute, response, error, loading } = useAsync(
        () => {
            return axios.get(`/Customer/search`, { params });
        }
    );

    return { execute, response, error, loading };
}

export default useCustomerSearch;