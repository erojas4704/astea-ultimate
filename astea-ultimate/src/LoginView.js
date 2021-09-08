import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import LoginForm from "./LoginForm";

const LoginView = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(props.location.state?.error);
    const auth = useAuth();

    useEffect(() => {
        setIsLoggedIn(auth && auth.success);
    }, [auth]);

    const handleSubmit = async form => {
        setIsLoading(true);
        try {
            const resp = await axios.post(`/auth/login`, { ...form, forceKick: true });
            if (resp.data.success) {
                setIsLoggedIn(true);
            }
        }
        catch (err) {
            console.log("THE ERROR ? ", err.response.data.error.message);
            setError(err.response.data.error.message);
        }
        setIsLoading(false);
    }

    return (
        <div>
            {isLoggedIn && <Redirect to="/astea" />}
            <h3>Login</h3>
            <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
            {error && <div className="error">{error.message}</div>}
        </div>
    );
};

export default LoginView;