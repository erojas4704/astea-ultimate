import Cookies from 'universal-cookie';
import axios from 'axios';
import { useEffect } from 'react';
import useAsync from './useAsync';

const cookies = new Cookies();

const useAuth = () => {
    const { execute, loading, response } = useAsync(() => axios.get('/auth/ValidateSession'));
    useEffect(execute, []);

    const token = cookies.get('astea-session');

    if (!token) return { success: false, loading }
    if (loading || !response) {
        return null;
    }
    return { success: response.data.success };
}

export default useAuth;