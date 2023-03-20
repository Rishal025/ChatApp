import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookie from 'cookiejs'
import { useEffect, useState } from "react";

function RequireAuth() {
    
    const [isCookie, setIsCookie] = useState('');
    useEffect(() => {
        setIsCookie(Cookie.get("jwt"));
    },[]);

    return (
        isCookie
         ? <Outlet />
         : <Navigate to='/login' />
    );
}

export default RequireAuth