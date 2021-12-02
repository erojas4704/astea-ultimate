import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function RequireAuth() {
    const auth = useSelector(state => state.auth);
    const isAuthenticated = auth.sessionId !== null;
    const navigate = useNavigate();

    if (!isAuthenticated)
        navigate("/");
        
    return (
        isAuthenticated ?
            <Outlet />
            : <Navigate to="/login" />
    );
}