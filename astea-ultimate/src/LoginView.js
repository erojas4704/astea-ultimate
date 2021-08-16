import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import LoginForm from "./LoginForm";

const LoginView = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(props.location.state?.error);
    const auth = useAuth();

    const handleSubmit = async form => {
        setIsLoading(true);
        try {
            const resp = await axios.post(`/auth/login`, { ...form, forceKick: true });
            if (resp.body === "success") {
                return <Redirect to="/home" />
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
            {auth && <Redirect to="/home" />}
            <h3>Login</h3>
            <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
            {error && <div className="error">{error.message}</div>}
        </div>
    );
};

export default LoginView;