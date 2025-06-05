import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from "react";

const PrivateRoute = () => {
    const { loading } = '';  
    const token = window.localStorage.getItem('accessToken')    
    //узнать у сервера, актуален ли токен?
    return token !== 'null' && token !== null  ? <Outlet /> : <Navigate to="/login" />;
    //return  <Outlet />;
    
    
}
export default PrivateRoute;