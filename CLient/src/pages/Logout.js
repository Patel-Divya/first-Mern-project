import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Logout = ()=>{
    const {LogoutUser} = useAuth();

    useEffect(()=>{
        toast.success('Logged out successfully')
        LogoutUser();
    },[LogoutUser]);

    return(
        <Navigate to='/login' />
    )
}

export default Logout;