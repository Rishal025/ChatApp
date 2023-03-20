import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import UseAuth from '../../Hooks/UseAuth';

function PersistLogin() {
    const {auth, setAuth} = UseAuth();
    useEffect(() => {
       !auth?._id && setAuth(JSON.parse(localStorage.getItem("userInfo")));
    },[])
    
  return (
    <>
     {
        auth && <Outlet/>
     }
    </>
  )
}

export default PersistLogin