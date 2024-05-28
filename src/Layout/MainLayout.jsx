import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import { useEffect, useState } from "react";


const MainLayout = () => {
    const location = useLocation();
    
    const [isLogin, setIslogin] = useState(null);
    useEffect(() => {
        setIslogin(location.pathname)
    }, [location.pathname])
    
    return (
        <div>
            {
                isLogin != '/login' && isLogin != '/signup' && <NavBar></NavBar>
            }
            <Outlet></Outlet>
            {
                isLogin != '/login' && isLogin != '/signup' && <Footer></Footer>
            }

        </div>
    );
};

export default MainLayout;