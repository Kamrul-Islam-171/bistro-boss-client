import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";


const imbb_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`


const UpdateItem = () => {
    const { id } = useParams();


    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { user, loading } = useContext(AuthContext);
    console.log(user)

    const { data : updatedMenu = {}, isLoading, refetch } = useQuery({
        queryKey: ['UpdatedMenuItems', id],
       
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/menu/${id}`);
            console.log(data)
            return data
        }
    })

    console.log('updaet = ', updatedMenu);



    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data);

        const imgFile = { image: data.image[0] };

        const res = await axiosPublic.post(imbb_url, imgFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // console.log(menuItem);

            const itemMenu = await axiosSecure.patch(`/menu/${id}`, menuItem);
            // reset();
            console.log(itemMenu.data);
            refetch();
        }

        // console.log(res.data);
    }


    return (
        <div>
            <div className='p-10'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input defaultValue={updatedMenu?.name} {...register("name")} type="text"
                            placeholder="Recipe Name"
                            className="input input-bordered w-full" />

                    </label>

                    <div className='flex gap-6'>
                        {/* category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select defaultValue={updatedMenu?.category} {...register("category")}
                                className="select select-bordered w-full">
                                <option disabled value={'default'}>Select A Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                            </select>

                        </label>

                        {/* price */}

                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input defaultValue={updatedMenu?.price} {...register("price")} type="number"
                                placeholder="Recipe Price"
                                className="input input-bordered w-full" />

                        </label>

                    </div>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details*</span>

                        </div>
                        <textarea defaultValue={updatedMenu?.recipe} {...register("recipe")} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>

                    </label>

                    <div className='my-6'>
                        <input {...register("image")} type="file" className="file-input w-full max-w-xs" />
                    </div>



                    <button className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;