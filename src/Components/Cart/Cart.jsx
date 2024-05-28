import React from 'react';
import useCart from '../../Hooks/useCart';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartData, refetch] = useCart();
    const price = cartData.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();
    const handleDelete = async(id) => {
        const {data} = await axiosSecure.delete(`/carts/${id}`);
        if(data.deletedCount > 0) {
            refetch();
            alert('deleted')
        }

    }
    return (
        <div className='p-10'>
            <div className='flex justify-between'>
                <p className='text-5xl'>
                    Total items : {cartData.length}

                </p>
                <p className='text-5xl'>Total Price : {price}</p>
                {
                    cartData.length ? <Link  to={'/dashbord/payment'}><button  className='btn btn-primary'>Pay</button></Link>
                    : <button disabled={!cartData.length} className='btn btn-primary'>Pay</button>
                }
            </div>

            <div>
                <div className="overflow-x-auto mt-10">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th className='text-xl'>Image</th>
                                <th className='text-xl'>Name</th>
                                <th className='text-xl'>Price</th>
                                <th className='text-xl'>Action</th>
                                <th className='text-xl'></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                cartData?.map((item, idx) => <tr key={item._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                           
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                        <br />
                                        {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                    </td>
                                    <td>{item.price}</td>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs">delete</button>
                                    </th>
                                </tr>)
                            }



                        </tbody>
                        {/* foot */}


                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;