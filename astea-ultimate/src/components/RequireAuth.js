import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
    const auth = useSelector(state => state.auth);
    const isAuthenticated = auth.sessionId !== null;

    return (
        isAuthenticated ?
            <Outlet />
            : <Navigate to="/login" />
    );
}