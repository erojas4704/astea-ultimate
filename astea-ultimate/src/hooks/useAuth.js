import axios from "axios";
import { useEffect, useState } from "react";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(true);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            setloading(true);
            const resp = await axios.get("/auth/ValidateSession");
            if(!resp.data.success) await axios.post('/auth/logout');
            setloading(false); //TODO maybe return user name and other details
            setAuthenticated(resp.data.success);
        }
        checkAuth();
    }, [axios]);

    return { authenticated, loading };
}