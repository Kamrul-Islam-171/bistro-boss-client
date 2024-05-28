import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from './../Hooks/useAdmin';


const AdminRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading) return <p className="text-6xl">Loading....</p>

    if(user && isAdmin) {
        return children;
    }
    return <Navigate to={'/'} state={{from:location}} replace></Navigate>
};

export default AdminRoute;