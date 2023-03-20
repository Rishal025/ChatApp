import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookie from 'cookiejs'
import { useEffect, useState } from "react";

const Protected = () => {

    const [isCookie, setIsCookie] = useState('');
    useEffect(() => {
        setIsCookie(Cookie.get("jwt"));
    },[]);

    return (
        isCookie
            ? <Navigate to='/' />
            : <Outlet />
    );
}

export default Protected;