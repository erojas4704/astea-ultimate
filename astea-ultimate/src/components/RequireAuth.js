import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { logoutUser, validateAuth } from "../actions/user";
import useAuth from "../hooks/useAuth";

export default function RequireAuth() {
    const auth = useSelector(state => state.auth);
    const isAuthenticated = auth.sessionId !== null;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!isAuthenticated) {
        //navigate("/");
        console.log("Should navigate back to login because terrible");
        console.log(`Do we have a sessionId in the cookie? ${isAuthenticated}`);
        dispatch(logoutUser());
    }

    return (
        isAuthenticated ?
            <Outlet />
            : <Navigate to="/login" />
    );
}