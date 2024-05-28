import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import { FaShoppingCart } from "react-icons/fa";
import useCart from '../../../Hooks/useCart';
import useAdmin from '../../../Hooks/useAdmin';
import Dashbord from './../../../Components/Dashbord/Dashbord';

const NavBar = () => {

    const { user, logOut } = useContext(AuthContext);
    const [cartData] = useCart();
    const [admin] = useAdmin();
    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const navoptions = < >
        <li className='text-lg'><NavLink to={'/'} style={({ isActive }) => {
            return isActive ? { color: "white", backgroundColor: 'green' } : {};
        }}>Home</NavLink></li>
        <li className='text-lg'><NavLink to={'/menu'} style={({ isActive }) => {
            return isActive ? { color: "white", backgroundColor: 'green' } : {};
        }}>Menu</NavLink></li>

        {
            user && admin && <li className='text-lg'><NavLink to={'/dashbord/adminHome'} style={({ isActive }) => {
                return isActive ? { color: "white", backgroundColor: 'green' } : {};
            }}>Dashbord</NavLink></li>
        }
        {
            user && !admin && <li className='text-lg'><NavLink to={'/dashbord/userHome'} style={({ isActive }) => {
                return isActive ? { color: "white", backgroundColor: 'green' } : {};
            }}>Dashbord</NavLink></li>
        }
        <li className='text-lg'><NavLink to={'/order/salad'} style={({ isActive }) => {
            return isActive ? { color: "white", backgroundColor: 'green' } : {};
        }}>Order</NavLink></li>

        <li>
            <Link to={'/dashbord/cart'}>
                <button className="btn btn-ghost">
                    <FaShoppingCart />
                    <div className="badge badge-secondary">+{cartData.length}</div>
                </button></Link>
        </li>

        {
            user ?
                <div>

                    <button onClick={handleLogout} className='btn btn-ghost'>Logout</button>
                </div>
                :
                <div>
                    <li className='text-lg'><NavLink to={'/login'} style={({ isActive }) => {
                        return isActive ? { color: "white", backgroundColor: 'green' } : {};
                    }}>Login</NavLink></li>
                </div>
        }

    </>


    return (
        <div className=''>
            <div className="navbar bg-black fixed z-10 max-w-screen-xl bg-opacity-30 text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navoptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bestro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navoptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;