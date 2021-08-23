import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import useAsync from "./useAsync";
const cookies = new Cookies();

const useTechnicians = () => {
    const { execute, loading, response } = useAsync(() => axios.get('/Technician?actionGroup=QNTech'));
    useEffect(execute, []);

    return { technicians: response?.data, isLoadingTechnicians: loading };
};

export default useTechnicians;