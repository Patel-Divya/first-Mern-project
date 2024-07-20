import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser , FaHome } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { GrServices } from "react-icons/gr";
import { useAuth } from "../../store/auth";

const AdminLayout = ()=>{
    const {user, isLoading} = useAuth();

    if(isLoading){
        return <h1>Loading......</h1>;
    }

    if (!user.isAdmin){
        return <Navigate to='/' />;
    }

    return (
        <>
        <header>
            <div>
                <nav>
                    <li>
                        <ul><FaUser/><NavLink to='/admin/users'>Users</NavLink></ul>
                        <ul><RiContactsBook3Line /><NavLink to='/admin/contact'>Contacts</NavLink></ul>
                        <ul><GrServices />Services</ul>
                        <ul><FaHome/>Home</ul>
                    </li>
                </nav>
            </div>
        </header> 
        <Outlet />
        </>
    )
}

export default AdminLayout;