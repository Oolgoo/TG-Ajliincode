import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"

const PrivateRoute = () => {
    const location = useLocation();
    const token = sessionStorage.getItem("accessToken");

    return (
      	// token이 있으면 모든것들을 표시, 없으면 로그인화면으로
        token
            ? 
            <Outlet />
            : 
            <Navigate to="/login" state={{ from: location }} replace />
    )
}
export default PrivateRoute