import { FaAd, FaBookOpen, FaHome, FaList, FaPaypal, FaShoppingCart, FaUser, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";


const Dashbord = () => {

    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">

                    {
                        isAdmin ?
                            <>
                                <li><NavLink to={'/dashbord/adminHome'}><FaHome></FaHome>Admin Home</NavLink></li>
                                <li><NavLink to={'/dashbord/addItems'}><FaUtensils></FaUtensils> Add Items</NavLink></li>
                                <li><NavLink to={'/dashbord/manageItems'}><FaList></FaList> Manage Items</NavLink></li>
                                <li><NavLink to={'/dashbord/bookings'}><FaAd></FaAd>Manage Bookins</NavLink></li>
                                <li><NavLink to={'/dashbord/allUsers'}><FaUsers></FaUsers> All Users</NavLink></li>
                            </>
                            :
                            <>
                                <li><NavLink to={'/dashbord/userHome'}><FaHome></FaHome>User Home</NavLink></li>
                                <li><NavLink to={'/dashbord/cart'}><FaShoppingCart></FaShoppingCart>My Cart</NavLink></li>
                                <li><NavLink to={'/dashbord/reservation'}>My Reservation</NavLink></li>
                                <li><NavLink to={'/dashbord/review'}><FaAd></FaAd>My Review</NavLink></li>
                                <li><NavLink to={'/dashbord/bookings'}><FaBookOpen></FaBookOpen>My Bookings</NavLink></li>
                                <li><NavLink to={'/dashbord/paymentHistory'}><FaPaypal></FaPaypal> Payment History</NavLink></li>
                            </>
                    }
                    <div className="divider"></div>
                    <li><NavLink to={'/'}><FaHome></FaHome> Home</NavLink></li>
                </ul>
            </div>
            <div className="flex-1">

                <Outlet></Outlet>
            </div>
        </div>



    );
};

export default Dashbord;