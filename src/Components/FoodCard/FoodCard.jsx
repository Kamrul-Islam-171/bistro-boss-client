import React, { useContext } from 'react';
import { AuthContext } from './../../Provider/AuthProvider';
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import axios from 'axios';
import useCart from '../../Hooks/useCart';


const FoodCard = ({ item }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const [, refetch] = useCart()
    const handleCart = (food) => {
        // console.log(food)
        if (user && user.email) {
            //save the food to the database
            const cartItem = {
                menuId: item._id,
                email: user.email,
                price: item.price,
                image : item.image,
                name:item.name
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                    if(res.data.insertedId) {

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "You have to be logged in",
                text: "Login first!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img className='w-full' src={item.image} alt="Shoes" /></figure>
                <p className='bg-slate-900 text-white absolute right-0 my-4 mx-4 px-4 py-1'>$ {item.price}</p>
                <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p className='cursor-pointer' title={item.recipe}>{item.recipe.slice(0, 70)}...</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => handleCart(item)} className="btn btn-primary">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;