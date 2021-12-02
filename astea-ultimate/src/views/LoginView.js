import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { cancelLogin, loginUser } from "../actions/user";
import LoginForm from "../components/LoginForm";

const LoginView = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const isLoggedIn = useSelector(state => state.auth.sessionId !== null);

    useEffect(() => {
        dispatch(cancelLogin()); //Cancel the login on mount
        return () => {
            dispatch(cancelLogin()); //Cancel the login on unmount
        }
    }, [dispatch]);

    const handleSubmit = form => {
        dispatch(loginUser(form));
    }

    return (
        <div>
            {isLoggedIn && <Navigate to="/astea" />}
            <h3>Login</h3>
            <LoginForm onSubmit={handleSubmit} isLoading={auth.loading} />
            {auth.error && <div className="error">{auth.error}</div>}
        </div>
    );
};

export default LoginView;