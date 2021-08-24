import axios from "axios";
import { useEffect } from "react";
import useAsync from "./useAsync";

const useTechnicians = () => {
    const { execute, loading, response } = useAsync(() => axios.get('/Technician?actionGroup=QNTech'));
    useEffect(execute, []);

    return { technicians: response?.data, isLoadingTechnicians: loading };
};

export default useTechnicians;