import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const PrivateRoutes = ({ children }) => {

    const { user } = useContext(UserContext);

    if (user && user.isAuthenticated === true) {

        const isAuthenticated = true;

        if (isAuthenticated) {
            return children
        }

        return <Navigate to="/users" />
    } else {
        return <Navigate to="/login" />
    }

}

export default PrivateRoutes;